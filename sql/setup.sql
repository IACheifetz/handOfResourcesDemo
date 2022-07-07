-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS swords;
DROP TABLE IF EXISTS helmets;
DROP TABLE IF EXISTS filaments;
DROP TABLE IF EXISTS instruments;

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

CREATE TABLE helmets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    helmet_name TEXT NOT NULL,
    helmet_region TEXT NOT NULL,
    era TEXT NOT NULL
);

CREATE TABLE filaments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    filament_name TEXT NOT NULL,
    flexibility TEXT NOT NULL,
    impact_resistance TEXT NOT NULL,
    heat_tolerance TEXT NOT NULL
);

CREATE TABLE instruments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_name TEXT NOT NULL,
    accessibility TEXT NOT NULL,
    average_price TEXT NOT NULL
);