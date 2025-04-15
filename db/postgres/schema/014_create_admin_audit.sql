CREATE TABLE admin_audit (
    "audit_id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION,
    "entity" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "original_value" TEXT NOT NULL,
    "new_value" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL
);

create index aa_date_idx on admin_audit (date);
create index aa_userId_idx on admin_audit (user_id);
