CREATE TABLE "team" (
    "team_id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR(255) UNIQUE NOT NULL,
    "created_by" INT REFERENCES "user"(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    "date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

create index t_createdBy_idx on team (created_by);
