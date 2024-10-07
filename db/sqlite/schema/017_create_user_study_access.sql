CREATE TABLE user_study_access (
    user_study_access_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    study_id TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);