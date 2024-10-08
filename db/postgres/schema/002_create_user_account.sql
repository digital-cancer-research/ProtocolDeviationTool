CREATE sequence user_account_seq increment by 1 start with 9;

CREATE TABLE "user_account" (
    "user_id" SERIAL PRIMARY KEY,
    "username" VARCHAR UNIQUE NOT NULL,
    "role_id" INT,
    "is_site" BOOL,
    "is_sponsor" BOOL,
    "date_created" VARCHAR
);

ALTER TABLE
    "user_account"
ADD
    FOREIGN KEY ("role_id") REFERENCES "role" ("role_id") ON DELETE CASCADE ON UPDATE CASCADE;