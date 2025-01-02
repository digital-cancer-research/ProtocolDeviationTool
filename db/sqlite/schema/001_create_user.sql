PRAGMA foreign_keys = ON;

CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    role TEXT CHECK(role IN ('ADMIN', 'USER', 'DEACTIVATED')),
    is_site BOOLEAN,
    is_sponsor BOOLEAN,
    date_created TEXT
);