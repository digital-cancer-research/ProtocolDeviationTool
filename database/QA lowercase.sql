CREATE TABLE "role" (
  "role_id" SERIAL PRIMARY KEY,
  "role_name" VARCHAR NOT NULL
);

CREATE TABLE "team" (
  "team_id" SERIAL PRIMARY KEY,
  "team_name" VARCHAR NOT NULL
);

CREATE TABLE "user_account" (
  "user_id" SERIAL PRIMARY KEY,
  "username" VARCHAR UNIQUE NOT NULL,
  "role_id" INT,
  "is_site" BOOL,
  "is_sponsor" BOOL
);

CREATE TABLE "user_team" (
  "user_team_id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "team_id" INT
);

CREATE TABLE "study" (
  "study_id" SERIAL PRIMARY KEY,
  "study_name" VARCHAR NOT NULL
);

CREATE TABLE "team_study_access" (
  "team_study_access_id" SERIAL PRIMARY KEY,
  "team_id" INT,
  "study_id" INT
);

CREATE TABLE "user_study_access" (
  "user_study_access_id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "study_id" INT
);

CREATE TABLE "data_entry" (
  "entry_id" SERIAL PRIMARY KEY,
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
  "user_id" INT,
  "category_id" INT
);

CREATE TABLE "dvspondes" (
  "dvspondes_id" SERIAL PRIMARY KEY,
  "dvspondes_value" VARCHAR NOT NULL
);

CREATE TABLE "pd_category" (
  "category_id" SERIAL PRIMARY KEY,
  "dvcat" VARCHAR NOT NULL,
  "dvdecod" VARCHAR NOT NULL,
  "dvterm" VARCHAR NOT NULL
);

ALTER TABLE "user_account" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "user_team" ADD FOREIGN KEY ("user_id") REFERENCES "user_account" ("user_id");

ALTER TABLE "user_team" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("team_id");

ALTER TABLE "team_study_access" ADD FOREIGN KEY ("team_id") REFERENCES "team" ("team_id");

ALTER TABLE "team_study_access" ADD FOREIGN KEY ("study_id") REFERENCES "study" ("study_id");

ALTER TABLE "user_study_access" ADD FOREIGN KEY ("user_id") REFERENCES "user_account" ("user_id");

ALTER TABLE "user_study_access" ADD FOREIGN KEY ("study_id") REFERENCES "study" ("study_id");

ALTER TABLE "data_entry" ADD FOREIGN KEY ("dvspondes_id") REFERENCES "dvspondes" ("dvspondes_id");

ALTER TABLE "data_entry" ADD FOREIGN KEY ("category_id") REFERENCES "pd_category" ("category_id");




-- Insert roles
INSERT INTO "role" ("role_name") VALUES
  ('Admin'),
  ('User');

-- Insert users with roles
INSERT INTO "user_account" ("username", "role_id", "is_site", "is_sponsor") VALUES
  ('AdminWithAllRoles', 1, true, true),
  ('AdminWithSiteRole', 1, true, false),
  ('AdminWithSponsorRole', 1, false, true),
  ('AdminWithNoSpecialRoles', 1, false, false),
  ('UserWithAllRoles', 2, true, true),
  ('UserWithSiteRole', 2, true, false),
  ('UserWithSponsorRole', 2, false, true),
  ('UserWithNoSpecialRoles', 2, false, false);
