CREATE sequence dvspondes_seq increment by 1 start with 1;

CREATE TABLE "dvspondes" (
  "dvspondes_id" SERIAL PRIMARY KEY,
  "dvspondes_value" VARCHAR NOT NULL
);