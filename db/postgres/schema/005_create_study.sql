CREATE TABLE "study" (
    "study_id" SERIAL PRIMARY KEY,
    "external_study_id" VARCHAR(255) NOT NULL
);

create index s_externalStudyId_idx on study (external_study_id);
