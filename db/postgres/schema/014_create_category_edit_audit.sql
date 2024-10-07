CREATE sequence category_edit_audit_seq increment by 1 start with 1;

CREATE TABLE "category_edit_audit" (
    "category_edit_audit_id" SERIAL PRIMARY KEY,
    "entry_id" INT,
    "change_from" VARCHAR,
    "change_to" VARCHAR,
    "username" VARCHAR,
    "date_time_edited" VARCHAR
);

ALTER TABLE
    "category_edit_audit"
ADD
    FOREIGN KEY ("username") REFERENCES "user_account" ("username") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
    "category_edit_audit"
ADD
    FOREIGN KEY ("entry_id") REFERENCES "data_entry" ("entry_id") ON DELETE CASCADE ON UPDATE CASCADE;