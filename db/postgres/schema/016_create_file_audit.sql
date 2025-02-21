CREATE TABLE file_audit (
    "audit_id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    "file_name" VARCHAR(255) NOT NULL,
    "file_status" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP NOT NULL
);