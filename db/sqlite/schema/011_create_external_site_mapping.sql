CREATE TABLE external_site_mapping (
    site_id INTEGER NOT NULL,
    external_site_id TEXT NOT NULL,
    PRIMARY KEY (site_id, external_site_id),
    FOREIGN KEY (site_id) REFERENCES site(site_id) ON DELETE CASCADE
);