CREATE TABLE "dvcat" (
  "dvcat_id" INTEGER PRIMARY KEY,
  "description" TEXT NOT NULL,
  "colour" TEXT NOT NULL
);

create index dc_description_idx on dvcat (description);
create index dc_colour_idx on dvcat (colour);
