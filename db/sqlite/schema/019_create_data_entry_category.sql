CREATE TABLE data_entry_category (
    data_entry_category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry_id INTEGER,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES pd_category (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(entry_id) REFERENCES data_entry(entry_id) ON DELETE CASCADE
);