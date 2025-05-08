CREATE TABLE "dvdecod" (
    "dvdecod_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "dvcat_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "dvterm" TEXT NOT NULL,
    "colour" TEXT NOT NULL,
    FOREIGN KEY ("dvcat_id") REFERENCES "dvcat"("dvcat_id") ON DELETE CASCADE ON UPDATE CASCADE
);

create index de_description_idx on dvdecod (description);
create index de_colour_idx on dvdecod (colour);
