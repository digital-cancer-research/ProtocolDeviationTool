CREATE TABLE "role" (
  "role_id" INT PRIMARY KEY,
  "role_name" VARCHAR NOT NULL
);

CREATE TABLE "team" (
  "team_id" INT PRIMARY KEY,
  "team_name" VARCHAR NOT NULL
);

CREATE TABLE "user" (
  "user_id" INT PRIMARY KEY,
  "username" VARCHAR UNIQUE NOT NULL,
  "role_id" INT,
  "is_site" BOOL,
  "is_sponsor" BOOL
);

CREATE TABLE "user_team" (
  "user_team_id" INT PRIMARY KEY,
  "user_id" INT,
  "team_id" INT
);

CREATE TABLE "study" (
  "study_id" INT PRIMARY KEY,
  "study_name" VARCHAR NOT NULL
);

CREATE TABLE "team_study_access" (
  "team_study_access_id" INT PRIMARY KEY,
  "team_id" INT,
  "study_id" INT
);

CREATE TABLE "user_study_access" (
  "user_study_access_id" INT PRIMARY KEY,
  "user_id" INT,
  "study_id" INT
);

CREATE TABLE "data_entry" (
  "entry_id" INT PRIMARY KEY,
  "study_id" INT NOT NULL,
  "site_id" INT NOT NULL,
  "dvspondes_id" INT,
  "usubjid" VARCHAR,
  "dventc" VARCHAR,
  "dventcviz" VARCHAR,
  "dvsponsev" VARCHAR,
  "impor" INT,
  "at" VARCHAR,
  "at_date" TIMESTAMP,
  "domain" VARCHAR,
  "dvseq" INT,
  "dvrefid" INT,
  "dvendtc" TIMESTAMP,
  "dvcatid" INT,
  "dvdecodid" INT,
  "adv" VARCHAR,
  "nonadv" VARCHAR,
  "dvs_cat" VARCHAR,
  "dvstdtc" TIMESTAMP,
  "user_id" INT
);

CREATE TABLE "dvspondes" (
  "dvspondes_id" INT PRIMARY KEY,
  "dvspondes_value" VARCHAR NOT NULL
);

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "user_team" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_team" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("team_id");

ALTER TABLE "team_study_access" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("team_id");

ALTER TABLE "team_study_access" ADD FOREIGN KEY ("study_id") REFERENCES "study" ("study_id");

ALTER TABLE "user_study_access" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_study_access" ADD FOREIGN KEY ("study_id") REFERENCES "study" ("study_id");

ALTER TABLE "data_entry" ADD FOREIGN KEY ("dvspondes_id") REFERENCES "dvspondes" ("dvspondes_id");

ALTER TABLE "data_entry" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");