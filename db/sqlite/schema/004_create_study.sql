CREATE TABLE "study" (
    "study_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "external_study_id" TEXT NOT NULL
);

create index s_externalStudyId_idx on study (external_study_id);

