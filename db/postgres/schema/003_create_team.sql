CREATE TABLE "team" (
    "team_id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR UNIQUE NOT NULL,
    "user_id" INT,
    "date_created" VARCHAR
);

ALTER TABLE
    "team"
ADD
    FOREIGN KEY ("user_id") REFERENCES "user_account" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;