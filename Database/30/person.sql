CREATE OR REPLACE FUNCTION get_year( age int )
RETURNS int
AS $CODE$
BEGIN
    RETURN extract( year FROM CURRENT_DATE )::int - age;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

CREATE TABLE  pperson
(
  age int  NOT NULL,
  year int GENERATED ALWAYS AS (get_year2(age)) STORED
);

insert into pperson2(
age)
values(18);
