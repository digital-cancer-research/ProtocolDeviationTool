CREATE TABLE "data" (
  "data_id" SERIAL PRIMARY KEY,
  "external_site_id" VARCHAR NOT NULL,
  "study_id" VARCHAR NOT NULL,
  "dvspondes" VARCHAR NOT NULL,
  "file_id" INT REFERENCES "file"("file_id") ON DELETE CASCADE ON UPDATE CASCADE,
  "usubjid" VARCHAR,
  "dventc" VARCHAR,
  "dventcviz" VARCHAR,
  "dvsponsev" VARCHAR,
  "impor" INT,
  "at" VARCHAR,
  "at_date" VARCHAR,
  "domain" VARCHAR,
  "dvseq" INT,
  "dvref_id" INT,
  "dvendtc" VARCHAR,
  "dvcat_id" INT,
  "dvdecod_id" INT,
  "adv" VARCHAR,
  "nonadv" VARCHAR,
  "dvscat" VARCHAR,
  "dvstdtc" VARCHAR
);