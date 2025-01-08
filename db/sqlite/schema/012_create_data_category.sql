CREATE TABLE data_category (
    data_category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_id INTEGER,
    dvdecod_id INTEGER,
    FOREIGN KEY (data_id) REFERENCES data(data_id) ON DELETE CASCADE,
    FOREIGN KEY (dvdecod_id) REFERENCES dvdecod(dvdecod_id) ON DELETE
    SET
        NULL
);