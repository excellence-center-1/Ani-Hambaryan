
-- Exercise 3:
-- You have a table called "employees" with the following columns:
-- employee_id (integer)
-- employee_name (text)
-- salary (numeric)
-- Create a trigger that updates the "employee_audit" table with the previous and current salary values whenever an employee's salary is updated.


CREATE TABLE employee(
    id INT,
    name VARCHAR(20),
    salary INT
);

CREATE TABLE employee_audit(
    employee_id INT,
    previous_salary INT,
    current_salary INT
);


CREATE OR REPLACE FUNCTION employee_audit()
RETURNS TRIGGER
AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        IF OLD.employee_id IS DISTINCT FROM NEW.id THEN
            INSERT INTO employee_audit (employee_id, previous_salary, current_salary)
            VALUES (NEW.id, 0, NEW.salary);
        ELSE 
            UPDATE employee_audit
            SET previous_salary = current_salary, current_salary = NEW.salary
            WHERE employee_id = NEW.id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE TRIGGER update_total_order
AFTER UPDATE ON employee
FOR EACH ROW EXECUTE FUNCTION employee_audit();