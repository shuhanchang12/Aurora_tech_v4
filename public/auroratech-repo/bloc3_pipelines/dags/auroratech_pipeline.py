from datetime import datetime, timedelta
import random
import requests
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook

default_args = {
    'owner': 'Shuhan_Chang',
    'depends_on_past': False,
    'start_date': datetime(2026, 6, 1),
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

def extract_transform_load_chromebook():
    """
    Core ETL Task:
    1. Extract: Pull real-time FX from Frankfurter API + Simulate container delays.
    2. Transform: Trigger Ocean-to-Air conversion via Air France Cargo if Sea Delay >= 12 days.
    3. Load: Ingest aligned dimensional and facts data into PostgreSQL.
    """
    # ---- 1. EXTRACT: Real-Time FX Ingestion (EUR/USD, EUR/TWD) ----
    # Source: Open-source Frankfurter API (https://github.com/lineofflight/frankfurter)
    fx_url = "https://api.frankfurter.dev/v1/latest?base=EUR"
    try:
        response = requests.get(fx_url, timeout=10)
        response.raise_for_status()
        fx_data = response.json()
        eur_to_usd = fx_data['rates']['USD']
        eur_to_twd = fx_data['rates']['TWD']
    except Exception as e:
        print(f"[WARNING] Ingestion failed. Triggering fallback moving-average rates: {e}")
        eur_to_usd, eur_to_twd = 1.0820, 35.150

    # ---- 2. TRANSFORM: Simulate Shipping Delay & Ocean-to-Air Strategy ----
    vendors = ['VND-NV-01', 'VND-TSMC-02', 'VND-AUO-03']
    target_date = datetime.now().date()
    records = []

    for v_id in vendors:
        # Simulate base maritime delay
        delay = random.choices([0, 1, 3, 12], weights=[0.5, 0.3, 0.1, 0.1])[0]
        transport_mode = 'Sea Freight'
        freight_cost_eur = 5.00 # Base sea freight unit cost

        # Ocean-to-Air Decision Rule: Expedite high-value NVIDIA GPUs if sea delay is critical (>= 12 days)
        if v_id == 'VND-NV-01' and delay >= 12:
            transport_mode = 'Air France Cargo'
            delay = 2 # Expedited transit reduces delay to 2 days
            freight_cost_eur = 45.00 # Premium air freight unit cost

        # Margin Impact Logic: Affected if freight cost spikes to €45 OR if Euro weakens significantly (< 1.05)
        margin_drop_label = 1 if (freight_cost_eur >= 45.00 or eur_to_usd < 1.05) else 0
        
        records.append((target_date, v_id, eur_to_usd, eur_to_twd, delay, transport_mode, freight_cost_eur, margin_drop_label))

    # ---- 3. LOAD: Ingestion into PostgreSQL Data Warehouse ----
    pg_hook = PostgresHook(postgres_conn_id='auroratech_postgres_conn')
    
    # Ingest Date Dimension
    pg_hook.run("""
        INSERT INTO dim_date (date_key, year, month, day, quarter)
        VALUES (%s, %s, %s, %s, %s) ON CONFLICT (date_key) DO NOTHING;
    """, parameters=(target_date, target_date.year, target_date.month, target_date.day, (target_date.month-1)//3+1))

    # Ingest Fact Records
    for r in records:
        pg_hook.run("""
            INSERT INTO fact_chromebook_margin_risk 
            (date_key, vendor_id, eur_to_usd, eur_to_twd, component_delay_days, transport_mode, freight_cost_eur, margin_drop_label)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """, parameters=r)
        print(f"[INGESTION SUCCESS] Vendor={r[1]} | Mode={r[5]} | Cost={r[6]} EUR | Delay={r[4]} Days")

with DAG(
    'auroratech_chromebook_supply_chain_pipeline',
    default_args=default_args,
    description='Aurora Tech Chromebook & GPU Inbound Supply Chain ETL Pipeline',
    schedule_interval='@daily',
    catchup=False,
) as dag:

    run_pipeline = PythonOperator(
        task_id='execute_chromebook_etl_task',
        python_callable=extract_transform_load_chromebook,
    )
