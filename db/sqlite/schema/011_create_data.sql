CREATE TABLE "data" (
    "data_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "mapping_id" TEXT NOT NULL,
    "study_id" INTEGER,
    "dvspondes" TEXT NOT NULL,
    "file_id" INTEGER,
    "usubjid" TEXT,
    "dventc" DATETIME,
    "dventcviz" TEXT,
    "dvsponsev" TEXT,
    "impor" TEXT,
    "at" TEXT,
    "at_date" DATETIME,
    "domain" TEXT,
    "dvseq" INTEGER,
    "dvref_id" INTEGER,
    "dvendtc" TEXT,
    "adv" TEXT,
    "nonadv" TEXT,
    "dvscat" TEXT,
    "dvstdtc" DATETIME,
    FOREIGN KEY ("study_id") REFERENCES "study"("study_id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("file_id") REFERENCES "file"("file_id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("mapping_id") REFERENCES "external_site_mapping"("mapping_id") ON DELETE SET NULL ON UPDATE CASCADE
);

create index d_studyId_idx on data (study_id);
create index d_mappingId_idx on data (mapping_id);
