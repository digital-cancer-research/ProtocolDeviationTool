CREATE TABLE admin_audit (
    "audit_id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION,
    "action" TEXT NOT NULL,
    "original_value" TEXT NOT NULL,
    "new_value" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL
);