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

/*Create a procedure that accepts a product ID and returns the name of the product and the total revenue generated from that product.*/

create type my_type2 as(n varchar(20),  t numeric);


create or replace function get_info_product( p_id int)
returns my_type2
as
$$
declare 
	result my_type2;
begin
select product.name,  sum(my_order.quantity * product.price)
into result.n,  result.t
from  product, my_order
where  product.id = p_id and my_order.product_id = p_id
group by product.name;
return result;
end;
$$
LANGUAGE plpgsql;
