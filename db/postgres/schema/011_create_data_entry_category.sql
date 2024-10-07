CREATE TABLE "data_entry_category" (
    "data_entry_category_id" SERIAL PRIMARY KEY,
    "entry_id" INT,
    "category_id" INT
);

ALTER TABLE
    "data_entry_category"
ADD
    FOREIGN KEY ("entry_id") REFERENCES "data_entry" ("entry_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE
    "data_entry_category"
ADD
    FOREIGN KEY ("category_id") REFERENCES "pd_category" ("category_id") ON DELETE CASCADE ON UPDATE CASCADE;