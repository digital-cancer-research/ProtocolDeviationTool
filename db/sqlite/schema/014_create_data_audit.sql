CREATE TABLE data_audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES user(user_id) ON DELETE SET NULL,
    data_id INTEGER REFERENCES data(data_id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    original_value TEXT NOT NULL,
    new_value TEXT NOT NULL,
    date TEXT
);