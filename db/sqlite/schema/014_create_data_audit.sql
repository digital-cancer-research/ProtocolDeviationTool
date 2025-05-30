CREATE TABLE data_audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES user(user_id) ON DELETE SET NULL ON UPDATE CASCADE,
    data_id INTEGER REFERENCES data(data_id) ON DELETE CASCADE ON UPDATE CASCADE,
    original_value TEXT NOT NULL,
    new_value TEXT NOT NULL,
    date DATETIME
);

create index da_date_idx on data_audit (date);
create index da_userId_idx on data_audit (user_id);
create index da_dataId_idx on data_audit (data_id);
