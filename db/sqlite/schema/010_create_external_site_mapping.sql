CREATE TABLE external_site_mapping (
    mapping_id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_id INTEGER NOT NULL,
    external_site_id TEXT UNIQUE NOT NULL,
    FOREIGN KEY (site_id) REFERENCES site(site_id) ON DELETE CASCADE ON UPDATE CASCADE
);