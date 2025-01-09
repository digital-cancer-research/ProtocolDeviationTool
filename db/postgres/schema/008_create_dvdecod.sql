CREATE TABLE "dvdecod" (
    "dvdecod_id" SERIAL PRIMARY KEY,
    "dvcat_id" INT REFERENCES "dvcat"("dvcat_id") ON DELETE CASCADE ON UPDATE CASCADE,
    "description" VARCHAR(255) NOT NULL,
    "dvterm" TEXT NOT NULL,
    "colour" VARCHAR(9) NOT NULL
);