CREATE TABLE admin_audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES user(user_id) ON DELETE SET NULL,
    entity TEXT NOT NULL,
    action TEXT NOT NULL,
    original_value TEXT NOT NULL,
    new_value TEXT NOT NULL,
    date DATETIME
);