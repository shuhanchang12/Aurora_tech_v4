-- Star Schema for Aurora Tech Data Warehouse

CREATE TABLE dim_chromebook_vendor (
    vendor_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    component_type VARCHAR(100)
);

CREATE TABLE dim_date (
    date_id INT PRIMARY KEY,
    full_date DATE NOT NULL,
    year INT NOT NULL,
    quarter INT NOT NULL,
    month INT NOT NULL
);

CREATE TABLE fact_chromebook_margin_risk (
    fact_id SERIAL PRIMARY KEY,
    date_id INT REFERENCES dim_date(date_id),
    vendor_id INT REFERENCES dim_chromebook_vendor(vendor_id),
    eur_to_usd NUMERIC(10,4),
    eur_to_twd NUMERIC(10,4),
    component_delay_days INT,
    freight_mode VARCHAR(50),
    freight_cost_eur NUMERIC(10,2),
    margin_impact_risk INT
);

-- Pre-populate vendor dimension
INSERT INTO dim_chromebook_vendor (vendor_name, country, component_type) VALUES
('NVIDIA', 'USA', 'GPU'),
('TSMC', 'Taiwan', 'Semiconductors'),
('AUO', 'Taiwan', 'LCD Display'),
('Samsung', 'South Korea', 'Memory');
