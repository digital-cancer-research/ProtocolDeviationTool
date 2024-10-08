CREATE TABLE "team_study_access" (
    "team_study_access_id" SERIAL PRIMARY KEY,
    "team_id" INT,
    "study_id" VARCHAR
);

ALTER TABLE
    "team_study_access"
ADD
    FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE CASCADE ON UPDATE CASCADE;