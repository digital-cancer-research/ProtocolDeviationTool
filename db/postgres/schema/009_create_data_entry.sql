CREATE sequence data_entry_seq increment by 1 start with 1;

CREATE TABLE "data_entry" (
    "entry_id" SERIAL PRIMARY KEY,
    "study_id" VARCHAR NOT NULL,
    "site_id" VARCHAR NOT NULL,
    "dvspondes_id" INT,
    "usubjid" VARCHAR,
    "dventc" VARCHAR,
    "dventcviz" VARCHAR,
    "dvsponsev" VARCHAR,
    "impor" INT,
    "at" VARCHAR,
    "at_date" VARCHAR,
    "domain" VARCHAR,
    "dvseq" INT,
    "dvrefid" INT,
    "dvendtc" VARCHAR,
    "dvcatid" INT,
    "dvdecodid" INT,
    "adv" VARCHAR,
    "nonadv" VARCHAR,
    "dvs_cat" VARCHAR,
    "dvstdtc" VARCHAR,
    "user_id" INT,
    "is_edited" BOOL
);

ALTER TABLE
    "data_entry"
ADD
    FOREIGN KEY ("dvspondes_id") REFERENCES "dvspondes" ("dvspondes_id") ON DELETE CASCADE ON UPDATE CASCADE;