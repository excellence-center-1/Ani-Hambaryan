CREATE USER game_user WITH PASSWORD '123';
ALTER USER game_user  CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE postgres TO game_user;
CREATE DATABASE api;
\c api 