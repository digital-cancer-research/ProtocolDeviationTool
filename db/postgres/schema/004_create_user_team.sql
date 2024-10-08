CREATE sequence user_team_seq increment by 1 start with 5;

CREATE TABLE "user_team" (
    "user_team_id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "team_id" INT
);

ALTER TABLE
    "user_team"
ADD
    FOREIGN KEY ("user_id") REFERENCES "user_account" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
    "user_team"
ADD
    FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE CASCADE ON UPDATE CASCADE;