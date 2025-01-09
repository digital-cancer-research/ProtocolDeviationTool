CREATE TABLE file (
    "file_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "uploaded_by" INTEGER REFERENCES "user"(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    "date_uploaded" DATETIME NOT NULL
);