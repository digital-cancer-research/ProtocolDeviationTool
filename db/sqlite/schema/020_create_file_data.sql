CREATE TABLE file_data (
    file_data_id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_id INTEGER,
    entry_id INTEGER,
    FOREIGN KEY(file_id) REFERENCES files(file_id) ON DELETE CASCADE,
    FOREIGN KEY(entry_id) REFERENCES data_entry(entry_id) ON DELETE CASCADE
);