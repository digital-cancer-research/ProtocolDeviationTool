CREATE TABLE user_account (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    role_id INTEGER,
    is_site BOOLEAN,
    is_sponsor BOOLEAN,
    date_created TEXT,
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE ON UPDATE CASCADE
);