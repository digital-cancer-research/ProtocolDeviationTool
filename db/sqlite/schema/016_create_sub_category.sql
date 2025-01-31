CREATE TABLE "data_sub_category" (
    data_category_id INTEGER NOT NULL,
    dvdecod_id INTEGER NOT NULL,
    FOREIGN KEY (data_category_id) REFERENCES "data_category"(data_category_id) ON DELETE CASCADE ON UPDATE SET NULL,
    FOREIGN KEY (dvdecod_id) REFERENCES "dvdecod"(dvdecod_id) ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY (data_category_id, dvdecod_id)
);