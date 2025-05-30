CREATE TABLE "team_study" (
    "team_id" INTEGER,
    "study_id" INTEGER,
    PRIMARY KEY (team_id, study_id),
    FOREIGN KEY (team_id) REFERENCES "team"(team_id) ON DELETE CASCADE,
    FOREIGN KEY (study_id) REFERENCES "study"(study_id) ON DELETE CASCADE
);

create index ts_teamId_idx on team_study (team_id);
