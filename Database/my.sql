CREATE USER 'user1_homework1'@'localhost' IDENTIFIED BY '123';
CREATE USER 'user2_homework1'@'localhost' IDENTIFIED BY '123';
GRANT ALL PRIVILEGES ON * . * TO 'user1_homework1'@'localhost';
GRANT SELECT, INSERT, UPDATE ON * . * TO 'user2_homework1'@'localhost';
SELECT user FROM mysql.user;
SHOW GRANTS FOR  'user2_homework1'@'localhost';
CREATE DATABASE database1_homework1;
SHOW DATABASES;
ALTER USER 'user1_homework1'@'localhost' IDENTIFIED BY '111';
ALTER USER 'user2_homework1'@'localhost' IDENTIFIED BY '222';


