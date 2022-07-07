-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS swords;

CREATE TABLE jobs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    job_name TEXT NOT NULL,
    min_level TEXT NOT NULL,
    job_type TEXT NOT NULL
);

CREATE TABLE swords (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sword_name TEXT NOT NULL,
    sword_period TEXT NOT NULL,
    metal_type TEXT NOT NULL
);
