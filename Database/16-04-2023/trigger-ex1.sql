CREATE TABLE my_order(
    id serial PRIMARY KEY,
    customer_id INT,
    total_order FLOAT
);
CREATE TABLE customer(
    id serial PRIMARY KEY,
    name VARCHAR(20),
    total_order FLOAT
);

ALTER TABLE My_order ADD FOREIGN KEY (customer_id) REFERENCES Customer (id);


-- Create a trigger that updates the "customer" table's "total_orders" column whenever a new order is added.

CREATE OR REPLACE FUNCTION update_customer_total_order()
RETURNS TRIGGER
AS $$
BEGIN
UPDATE Customer
SET total_order = total_order+New.total_order
WHERE id = New.customer_id;
RETURN NEW;
END;
$$
LANGUAGE PLPGSQL;

CREATE TRIGGER update_total_order
AFTER INSERT ON my_order
FOR EACH ROW EXECUTE FUNCTION update_customer_total_order();
