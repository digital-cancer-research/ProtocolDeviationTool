CREATE TABLE "data_category" (
    "data_category_id" SERIAL PRIMARY KEY,
    "data_id" INT REFERENCES "data"("data_id") ON DELETE CASCADE ON UPDATE CASCADE,
    "dvdecod_id" INT REFERENCES "dvdecod"("dvdecod_id") ON DELETE
    SET
        NULL ON UPDATE CASCADE
);