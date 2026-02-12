-- Добавляем поля rating и reviews_count в таблицу users
ALTER TABLE users ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.00;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0;