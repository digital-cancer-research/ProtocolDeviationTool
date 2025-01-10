CREATE TABLE "data_category" (
    data_id INT NOT NULL,
    dvdecod_id INT NOT NULL,
    PRIMARY KEY (data_id, dvdecod_id),
    FOREIGN KEY (data_id) REFERENCES "data"(data_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dvdecod_id) REFERENCES "dvdecod"(dvdecod_id) ON DELETE SET NULL ON UPDATE CASCADE
);