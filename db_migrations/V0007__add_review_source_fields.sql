-- Добавляем поля для хранения источника отзывов (2ГИС, Яндекс.Карты и т.д.)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'manual';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS source_id VARCHAR(255);

-- Создаём индекс для быстрого поиска по источнику
CREATE INDEX IF NOT EXISTS idx_reviews_source ON reviews(source, source_id);

-- Добавляем комментарии
COMMENT ON COLUMN reviews.source IS 'Источник отзыва: manual, 2gis, yandex_maps';
COMMENT ON COLUMN reviews.source_id IS 'ID отзыва в источнике для предотвращения дублирования';