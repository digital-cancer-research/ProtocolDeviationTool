CREATE TABLE team (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name TEXT NOT NULL,
    user_id INTEGER,
    date_created TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);