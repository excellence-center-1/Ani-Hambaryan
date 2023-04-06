CREATE OR REPLACE FUNCTION get_year( age int )
RETURNS int
AS $CODE$
BEGIN
    RETURN extract( year FROM CURRENT_DATE )::int - age;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

CREATE TABLE  person
(
  age int  NOT NULL,
  year int GENERATED ALWAYS AS (get_year(age)) STORED
);

insert into person(
age)
values(18);
