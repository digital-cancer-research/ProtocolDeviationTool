CREATE TABLE "team" (
    "team_id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR UNIQUE NOT NULL,
    "created_by" INT REFERENCES "user"(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    "date_created" VARCHAR
);