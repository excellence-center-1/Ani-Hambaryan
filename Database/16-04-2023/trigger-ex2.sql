
-- Exercise 2:
-- You have a table called "products" with the following columns:
-- product_id (integer)
-- product_name (text)
-- stock_quantity (integer)
-- Create a trigger that prevents stock_quantity from being updated to a negative value.



CREATE TABLE product(
    id serial PRIMARY KEY,
    name VARCHAR(50),
    stock_quantity INT
);


CREATE OR REPLACE FUNCTION prevent_negative()
RETURNS TRIGGER
AS $$

BEGIN
if New.stock_quantity < 0 then
raise exception '% is a negative number, the quantity cannot be negative', new.stock_quantity;
end if;

RETURN NEW;
END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER negative
BEFORE INSERT 
ON product
FOR EACH ROW 
when (new.stock_quantity < 0)
 EXECUTE FUNCTION prevent_negative();
