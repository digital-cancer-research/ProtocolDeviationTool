CREATE TABLE "team" (
    "team_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "team_name" TEXT UNIQUE NOT NULL,
    "created_by" INTEGER,
    "date_created" DATETIME,
    FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE
);
