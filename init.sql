-- Create separate DB for mortgage server
CREATE DATABASE IF NOT EXISTS mortgage_db;
GRANT ALL PRIVILEGES ON mortgage_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
