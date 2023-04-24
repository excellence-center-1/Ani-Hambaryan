CREATE TABLE "Employees" (
  "id" Serial PRIMARY KEY,
  "name" Varchar(20)
);

CREATE TABLE "Projects" (
  "id" Serial PRIMARY KEY,
  "name" Varchar(20)
);

CREATE TABLE "Employee_project_asignment" (
  "employees_id" INT,
  "project_id" INT,
  "start_date" TIMESTAMP,
  "end_date" TIMESTAMP
);

ALTER TABLE "Employee_project_asignment" ADD FOREIGN KEY ("employees_id") REFERENCES "Employees" ("id");

ALTER TABLE "Employee_project_asignment" ADD FOREIGN KEY ("project_id") REFERENCES "Projects" ("id");


insert into "Employees"("name") values ('John'),('Jane');

insert into "Projects"("name") values ('A'),('B');

insert into "Employee_project_asignment"("employees_id", "project_id", "start_date", "end_date") values (1, 1, '2022-01-01','2022-06-30'), (1, 2, '2022-07-01','2022-12-31'), (2, 2, '2022-01-01','2022-12-31');

/*ex - 2*/
select "employees_id", "project_id", (extract(epoch from "end_date") - extract(epoch from "start_date")) / 3600 as hours from "Employee_project_asignment";

/*
 employees_id | project_id |         hours         
--------------+------------+-----------------------
            1 |          1 | 4320.0000000000000000
            1 |          2 | 4392.0000000000000000
            2 |          2 | 8736.0000000000000000
(3 rows)

*/
select "employees_id", "project_id", date_part('month', "start_date") as start_month, date_part('month', "end_date") as end_month  from "Employee_project_asignment";
 
/*
 employees_id | project_id | start_month | end_month 
--------------+------------+-------------+-----------
            1 |          1 |           1 |         6
            1 |          2 |           7 |        12
            2 |          2 |           1 |        12
(3 rows)

*/
