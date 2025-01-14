CREATE TABLE "data" (
  "data_id" SERIAL PRIMARY KEY,
  "study_id" VARCHAR(255) REFERENCES "study"("study_id") ON DELETE CASCADE ON UPDATE CASCADE,
  "external_site_id" VARCHAR(255) NOT NULL,
  "dvspondes" VARCHAR(255) NOT NULL,
  "file_id" INT REFERENCES "file"("file_id") ON DELETE CASCADE ON UPDATE CASCADE,
  "usubjid" VARCHAR(255),
  "dventc" TIMESTAMP,
  "dventcviz" VARCHAR(255),
  "dvsponsev" VARCHAR(255),
  "impor" VARCHAR(255),
  "at" VARCHAR(255),
  "at_date" TIMESTAMP,
  "domain" VARCHAR(255),
  "dvseq" INT,
  "dvref_id" INT,
  "dvendtc" VARCHAR(255),
  "adv" VARCHAR(255),
  "nonadv" VARCHAR(255),
  "dvscat" VARCHAR(255),
  "dvstdtc" TIMESTAMP
);