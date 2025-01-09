CREATE TABLE "file" (
    "file_id" SERIAL PRIMARY KEY,
    "file_name" VARCHAR NOT NULL,
    "uploaded_by" INT REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    "date_uploaded" VARCHAR NOT NULL
);