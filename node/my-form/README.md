**Postgresql**
sudo -u postgres psql
CREATE USER my_form WITH PASSWORD '123';
ALTER USER my_form CREATEDB;
**psql -U my_form -h localhost -d signup**

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password VARCHAR(10),
  email VARCHAR(20),
  birthday TIMESTAMP,
  gender VARCHAR(10)
);

SELECT * from users;

**run client**

cd Ani-Hambaryan/node/my-form/client

npm start

**run server**

cd Ani-Hambaryan/node/my-form/server

node server.js
