CREATE TABLE "user" (
    "user_id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "role" role NOT NULL,
    "is_site" BOOL NOT NULL,
    "is_sponsor" BOOL NOT NULL,
    "date_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);