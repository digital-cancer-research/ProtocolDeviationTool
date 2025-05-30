CREATE TABLE "data_category" (
    data_category_id SERIAL PRIMARY KEY,
    data_id INT NOT NULL,
    dvcat_id INT NOT NULL,
    FOREIGN KEY (data_id) REFERENCES "data"(data_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (dvcat_id) REFERENCES "dvcat"(dvcat_id) ON DELETE SET NULL ON UPDATE CASCADE
);

create index dc_dataId_idx on data_category (data_id);
create index dc_dvcatId_idx on data_category (dvcat_id);
