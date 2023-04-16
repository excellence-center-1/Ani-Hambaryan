CREATE TABLE Customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  address VARCHAR(20),
  email VARCHAR(20),
  phone VARCHAR(20)
);

CREATE TABLE Product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  price INT
);

CREATE TABLE My_order (
  id SERIAL PRIMARY KEY,
  date_sale TIMESTAMP,
  customer_id INT,
  product_id INT,
  quantity INT
);

ALTER TABLE My_order ADD FOREIGN KEY (customer_id) REFERENCES Customer (id);

ALTER TABLE My_order ADD FOREIGN KEY (product_id) REFERENCES Product (id);

/*Create a procedure that accepts a date range and returns the total revenue generated during that time period.*/


create or replace function total_revenue(date1 TIMESTAMP, date2 TIMESTAMP)
returns int
as
$$
declare 
	result int;
begin
select sum(my_order.quantity * product.price)
into result
from product
join
    my_order ON product.id = my_order.product_id
where   
    my_order.date_sale > date1 and my_order.date_sale<date2;
return result;
end;
$$
LANGUAGE plpgsql;