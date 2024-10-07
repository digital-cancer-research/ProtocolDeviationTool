CREATE TABLE team_study_access (
    team_study_access_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER,
    study_id TEXT,
    FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE ON UPDATE CASCADE
);