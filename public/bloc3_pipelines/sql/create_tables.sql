-- fact_chromebook_margin_risk and dimensions creation
CREATE TABLE IF NOT EXISTS dim_date (
    date_id INT PRIMARY KEY,
    full_date DATE NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL
);

CREATE TABLE IF NOT EXISTS dim_chromebook_vendor (
    vendor_id INT PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS fact_chromebook_margin_risk (
    fact_id SERIAL PRIMARY KEY,
    date_id INT REFERENCES dim_date(date_id),
    vendor_id INT REFERENCES dim_chromebook_vendor(vendor_id),
    eur_to_usd NUMERIC(10,4),
    component_delay_days INT,
    freight_cost_eur NUMERIC(10,2),
    margin_impact_risk INT
);
