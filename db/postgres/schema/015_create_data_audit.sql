CREATE TABLE data_audit (
    "audit_id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    "data_id" INT REFERENCES "data"("data_id") ON DELETE SET NULL ON UPDATE CASCADE,
    "original_value" TEXT NOT NULL,
    "new_value" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL
);