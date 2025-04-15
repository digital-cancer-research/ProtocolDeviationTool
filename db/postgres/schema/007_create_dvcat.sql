CREATE TABLE "dvcat" (
  "dvcat_id" SERIAL PRIMARY KEY,
  "description" VARCHAR(255) NOT NULL,
  "colour" VARCHAR(9) NOT NULL
);

create index dc_description_idx on dvcat (description);
create index dc_colour_idx on dvcat (colour);
