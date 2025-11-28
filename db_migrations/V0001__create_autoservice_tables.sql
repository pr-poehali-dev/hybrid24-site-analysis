
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    brand_id INTEGER NOT NULL REFERENCES brands(id),
    name VARCHAR(100) NOT NULL,
    year_from INTEGER,
    year_to INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(brand_id, name)
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    duration VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_prices (
    id SERIAL PRIMARY KEY,
    service_id INTEGER NOT NULL REFERENCES services(id),
    brand_id INTEGER REFERENCES brands(id),
    model_id INTEGER REFERENCES models(id),
    base_price DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT '₽',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_models_brand ON models(brand_id);
CREATE INDEX idx_service_prices_service ON service_prices(service_id);
CREATE INDEX idx_service_prices_brand ON service_prices(brand_id);
CREATE INDEX idx_service_prices_model ON service_prices(model_id);

COMMENT ON TABLE brands IS 'Автомобильные бренды (Toyota, Honda и т.д.)';
COMMENT ON TABLE models IS 'Модели автомобилей для каждого бренда';
COMMENT ON TABLE services IS 'Услуги автосервиса';
COMMENT ON TABLE service_prices IS 'Цены на услуги для конкретных брендов/моделей';
