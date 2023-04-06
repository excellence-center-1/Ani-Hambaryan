CREATE TABLE "brand" (
  "id" serial PRIMARY KEY,
  "name" VARCHAR(50)
);

CREATE TABLE "provider" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "address" VARCHAR(70) NOT NULL,
  "phone" VARCHAR(12) NOT NULL
);

CREATE TABLE "product_name" (
  "id" serial PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL
);

CREATE TABLE "product" (
  "id" serial PRIMARY KEY,
  "brand_id" INT,
  "product_id" INT,
  "provider_id" INT
);

CREATE TABLE "delivery_price" (
  "id" serial PRIMARY KEY,
  "product_id" INT,
  "DATE" TIMESTAMP,
  "current_price" INT NOT NULL,
  "measurement_unit" VARCHAR(10)
);

CREATE TABLE "store" (
  "id" serial PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL,
  "address" VARCHAR(70) NOT NULL,
  "phone" VARCHAR(12) NOT NULL,
  "budget" INT
);

CREATE TABLE "sale_price" (
  "id" serial PRIMARY KEY,
  "store_id" INT,
  "product_id" INT,
  "DATE" TIMESTAMP,
  "current_price" INT NOT NULL,
  "measurement_unit" VARCHAR(10)
);

CREATE TABLE "customer" (
  "id" serial PRIMARY KEY,
  "first_name" VARCHAR(50) NOT NULL,
  "last_name" VARCHAR(50) NOT NULL,
  "address" VARCHAR(70) NOT NULL,
  "phone" VARCHAR(12) NOT NULL,
  "email" VARCHAR(60),
  "budget" INT
);

CREATE TABLE "product_order" (
  "id" serial PRIMARY KEY,
  "customer_id" INT NOT NULL,
  "product_id" INT NOT NULL,
  "sale_price_id" INT,
  "store_id" INT NOT NULL,
  "order_date" DATE,
  "quantity_shipped" INT
);

COMMENT ON COLUMN "delivery_price"."DATE" IS 'DEFAULT CURRENT_TIMESTAMP';

COMMENT ON COLUMN "sale_price"."DATE" IS 'DEFAULT CURRENT_TIMESTAMP';

ALTER TABLE "product" ADD FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("provider_id") REFERENCES "provider" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("product_id") REFERENCES "product_name" ("id");

ALTER TABLE "delivery_price" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "sale_price" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "sale_price" ADD FOREIGN KEY ("store_id") REFERENCES "store" ("id");

ALTER TABLE "product_order" ADD FOREIGN KEY ("store_id") REFERENCES "store" ("id");

ALTER TABLE "product_order" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_order" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("id");

ALTER TABLE "product_order" ADD FOREIGN KEY ("sale_price_id") REFERENCES "sale_price" ("id");
