CREATE TABLE "data" (
    "data_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "external_site_id" TEXT NOT NULL,
    "study_id" TEXT NOT NULL,
    "dvspondes" TEXT NOT NULL,
    "file_id" INTEGER,
    "usubjid" TEXT,
    "dventc" TEXT,
    "dventcviz" TEXT,
    "dvsponsev" TEXT,
    "impor" INTEGER,
    "at" TEXT,
    "at_date" TEXT,
    "domain" TEXT,
    "dvseq" INTEGER,
    "dvref_id" INTEGER,
    "dvendtc" TEXT,
    "dvcat_id" INTEGER,
    "dvdecod_id" INTEGER,
    "adv" TEXT,
    "nonadv" TEXT,
    "dvscat" TEXT,
    "dvstdtc" TEXT,
    FOREIGN KEY ("file_id") REFERENCES "file"("file_id") ON DELETE CASCADE
);