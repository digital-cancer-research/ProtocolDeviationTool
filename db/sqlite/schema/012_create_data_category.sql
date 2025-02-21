CREATE TABLE "data_category" (
    data_category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_id INT NOT NULL,
    dvcat_id INT NOT NULL,
    FOREIGN KEY (data_id) REFERENCES "data"(data_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dvcat_id) REFERENCES "dvcat"(dvcat_id) ON DELETE SET NULL ON UPDATE CASCADE
);