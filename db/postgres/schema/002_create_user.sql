CREATE TABLE "user" (
    "user_id" SERIAL PRIMARY KEY,
    "username" VARCHAR UNIQUE NOT NULL,
    "role" role NOT NULL,
    "is_site" BOOL NOT NULL,
    "is_sponsor" BOOL NOT NULL,
    "date_created" VARCHAR
);