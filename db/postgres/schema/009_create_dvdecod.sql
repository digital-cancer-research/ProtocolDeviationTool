CREATE TABLE "dvdecod" (
    "dvdecod_id" SERIAL PRIMARY KEY,
    "dvcat_id" SERIAL PRIMARY KEY REFERENCES "dvcat"("dvcat_id") ON DELETE CASCADE ON UPDATE CASCADE,
    "description" VARCHAR NOT NULL,
    "dvterm" VARCHAR NOT NULL,
    "colour" VARCHAR NOT NULL
);