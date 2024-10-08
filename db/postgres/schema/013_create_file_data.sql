CREATE sequence file_data_seq increment by 1 start with 1;


CREATE TABLE "file_data" (
  "file_data_id" SERIAL PRIMARY KEY,
  "file_id" INT,
  "entry_id" INT
);

ALTER TABLE "file_data" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("file_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "file_data" ADD FOREIGN KEY ("entry_id") REFERENCES "data_entry" ("entry_id") ON DELETE CASCADE ON UPDATE CASCADE;
