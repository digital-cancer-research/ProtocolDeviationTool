CREATE TABLE external_site_mapping (
  mapping_id SERIAL PRIMARY KEY,
  site_id INT REFERENCES "site"("site_id") ON UPDATE CASCADE ON DELETE CASCADE,
  external_site_id VARCHAR(255) UNIQUE NOT NULL
);