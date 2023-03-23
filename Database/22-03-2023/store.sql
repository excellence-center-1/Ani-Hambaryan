CREATE DATABASE store;
\c store

CREATE TABLE brand (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);


INSERT INTO brand (name)
VALUES ('Zeytun'), 
       ('Dan desert');

CREATE TABLE product (
   id serial PRIMARY KEY,
   brand_id INT NOT NULL,
   name VARCHAR(50) NOT NULL,
   delivery_price INT NOT NULL,
   sale_price INT NOT NULL,
   FOREIGN KEY (brand_id)
       REFERENCES brand (id)
);

INSERT INTO product (brand_id, name, delivery_price, sale_price)
VALUES (1, 'cake Eskimo', 1500, 1800), 
       (2, 'cake lakomka', 3300, 3500),
       (1, 'cake bbb', 1600, 1850);

CREATE TABLE provider (
   ITN VARCHAR (6) UNIQUE NOT NULL PRIMARY KEY,
   brand_id INT NOT NULL,
   name VARCHAR(50) NOT NULL,
   address VARCHAR(70) NOT NULL,
   phone VARCHAR(12) NOT NULL,  
   FOREIGN KEY (brand_id)
       REFERENCES brand (id)
);

INSERT INTO provider (ITN, brand_id, name, address, phone)
VALUES (011111, 1, 'A LLC', 'A', '+37495111111'), 
       (022222, 2, 'B LLC', 'B', '+37495222222');
 
CREATE TABLE store (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   address VARCHAR(70) NOT NULL,
   phone VARCHAR(12) NOT NULL,
   budget INT
);

INSERT INTO store (name, address, phone, budget)
VALUES ('An', 'Aa', '+3795411235', 1000000), 
       ('Bn', 'Ba', '+37499111111', 20000000);

CREATE TABLE customer (
   id serial PRIMARY KEY,
   first_name VARCHAR(50) NOT NULL,
   last_name VARCHAR(50) NOT NULL,
   address VARCHAR(70) NOT NULL,
   phone VARCHAR(12) NOT NULL,
   email VARCHAR(60)
);

INSERT INTO customer (first_name, last_name,  address, phone, email)
VALUES ('Af', 'Al', 'AAA ', '+3794411235', 'A@gmail.com'), 
       ('Bf', 'Bl','BBB',  '+37491111111', 'B@gmail.com');

CREATE TABLE product_order (
   id serial PRIMARY KEY,
   store_id INT NOT NULL,
   product_id INT NOT NULL,
   customer_id INT NOT NULL,
   order_date DATE,
   quantity_shipped INT,
   FOREIGN KEY (store_id)
       REFERENCES store (id),
   FOREIGN KEY (product_id)
       REFERENCES product (id),
   FOREIGN KEY (customer_id)
       REFERENCES customer (id)
);

INSERT INTO product_order (store_id, product_id, customer_id, order_date, quantity_shipped)
VALUES (1, 2, 1, DATE '2023-01-02', 5), 
       (2, 1, 1, DATE '2023-02-02', 4), 
       (1, 1, 2, DATE '2023-02-06', 10); 
