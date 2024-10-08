CREATE TABLE audit_trail (
    audit_trail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    entity_changed TEXT,
    attribute_changed TEXT,
    change_from TEXT,
    change_to TEXT,
    date_time_edited TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);