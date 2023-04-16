CREATE TABLE my_order(
    id INT,
    customer_id INT,
    order_total FLOAT
);
CREATE TABLE customer(
    id INT,
    name VARCHAR(20),
    order_total FLOAT
);

ALTER TABLE My_order ADD FOREIGN KEY (customer_id) REFERENCES Customer (id);
ALTER TABLE Customer ADD FOREIGN KEY (order_total) REFERENCES my_order(order_total);

CREATE TRIGGER trigger1 
