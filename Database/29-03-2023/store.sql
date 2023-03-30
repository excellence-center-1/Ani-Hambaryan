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
   id SERIAL PRIMARY KEY, 
   name VARCHAR(50) NOT NULL,
   address VARCHAR(70) NOT NULL,
   phone VARCHAR(12) NOT NULL UNIQUE 
);



INSERT INTO provider (name, address, phone)
VALUES ('A LLC', 'A', '+37495111111'), 
       ('B LLC', 'B', '+37495222222');
 
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
   phone VARCHAR(12) NOT NULL UNIQUE,
   email VARCHAR(60) CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
   budget INT
);

INSERT INTO customer (first_name, last_name,  address, phone, email, budget)
VALUES ('Af', 'Al', 'AAA ', '+3794411235', 'A@gmail.com', 100000), 
       ('Bf', 'Bl','BBB',  '+37491111111', 'B@gmail.com', 200000);

CREATE TABLE product_order (
   id serial PRIMARY KEY,
   store_id INT NOT NULL,
   product_id INT NOT NULL,
   customer_id INT NOT NULL,
   order_date DATE,
   quantity_shipped INT,
   product_price INT,
   FOREIGN KEY (store_id)
       REFERENCES store (id),
   FOREIGN KEY (product_id)
       REFERENCES product (id),
   FOREIGN KEY (customer_id)
       REFERENCES customer (id)
);

INSERT INTO product_order (store_id, product_id, customer_id, order_date, quantity_shipped, product_price)
VALUES (1, 2, 1, DATE '2023-01-02', 5, 1000), 
       (2, 1, 1, DATE '2023-02-02', 4, 1200), 
       (1, 1, 2, DATE '2023-02-06', 10, 650); 
       
       
SELECT first_name || ' ' ||last_name
FROM customer;

SELECT * FROM customer ORDER BY first_name ASC;

SELECT * FROM customer ORDER BY last_name DESC;

SELECT * FROM customer WHERE first_name = 'Bf' AND last_name = 'Bl' ORDER BY first_name DESC;

SELECT * FROM customer WHERE first_name IN ( 'Af');

SELECT * FROM store WHERE phone LIKE '+37499%' ORDER BY name DESC;

SELECT * FROM store WHERE budget BETWEEN 1000000 AND 1500000 ORDER BY name DESC;

select * FROM store LIMIT 5;  

SELECT * FROM store LIMIT 4 OFFSET 3;
SELECT * FROM store ORDER BY id DESC LIMIT 4 OFFSET 3;

SELECT SUM(delivery_price) FROM product;

SELECT product_id, quantity_shipped, product_price, quantity_shipped*product_price AS price from product_order;
--create new field price = quantity_shipped * product_price--


