CREATE TABLE "user_study_access" (
    "user_study_access_id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "study_id" VARCHAR
);

ALTER TABLE
    "user_study_access"
ADD
    FOREIGN KEY ("user_id") REFERENCES "user_account" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;