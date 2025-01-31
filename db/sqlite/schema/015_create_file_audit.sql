CREATE TABLE file_audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES user(user_id) ON DELETE SET NULL,
    file_name TEXT NOT NULL,
    file_status TEXT NOT NULL,
    date DATETIME
);