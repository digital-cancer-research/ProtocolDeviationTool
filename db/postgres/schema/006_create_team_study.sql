CREATE TABLE "team_study" (
    "team_id" INT,
    "study_id" INT,
    PRIMARY KEY (team_id, study_id),
    FOREIGN KEY (team_id) REFERENCES "team"(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (study_id) REFERENCES "study"(study_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create index ts_teamId_idx on team_study (team_id);
