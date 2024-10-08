CREATE sequence audit_trail_seq increment by 1 start with 1;

CREATE TABLE "audit_trail" (
    "audit_trail_id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "entity_changed" VARCHAR,
    "attribute_changed" VARCHAR,
    "change_from" VARCHAR,
    "change_to" VARCHAR,
    "date_time_edited" VARCHAR
);

ALTER TABLE
    "audit_trail"
ADD
    FOREIGN KEY ("user_id") REFERENCES "user_account" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;