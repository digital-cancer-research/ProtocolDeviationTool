CREATE TABLE category_edit_audit (
    category_edit_audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    entry_id INTEGER,
    change_from TEXT,
    change_to TEXT,
    username TEXT,
    date_time_edited TEXT,
    FOREIGN KEY(username) REFERENCES user_account(username) ON DELETE CASCADE,
    FOREIGN KEY(entry_id) REFERENCES data_entry(entry_id) ON DELETE CASCADE
);