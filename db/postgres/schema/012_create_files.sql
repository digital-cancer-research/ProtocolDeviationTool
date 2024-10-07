CREATE sequence files_seq increment by 1 start with 1;

CREATE TABLE "files" (
    "file_id" SERIAL PRIMARY KEY,
    "file_name" VARCHAR,
    "username" VARCHAR,
    "date_time_uploaded" VARCHAR
);