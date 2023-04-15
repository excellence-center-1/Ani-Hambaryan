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
  customer_id INT,
  product_id INT,
  quantity INT
);

ALTER TABLE My_order ADD FOREIGN KEY (customer_id) REFERENCES Customer (id);

ALTER TABLE My_order ADD FOREIGN KEY (product_id) REFERENCES Product (id);

/*Create a procedure that accepts a customer ID and returns the customer's name, email, phone, and the total amount spent on orders.*/


create type my_type as(n varchar(20), p varchar(20), e varchar(20), t int);

create function get(c_id int, p_id int)
returns my_type

as
$$
declare 
	result my_type;
begin
select customer.name, customer.phone, customer.email,  my_order.quantity*product.price
into result.n, result.p, result.e, result.t
from customer,  my_order, product
where my_order.customer_id = c_id and product.id = p_id and my_order.product_id = p_id;
return result;
end;
$$
LANGUAGE plpgsql;
