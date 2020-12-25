DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department(
  id INT PRIMARY KEY,
  names VARCHAR(30)
);

CREATE TABLE roles(
    
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee(
    id  INT PRIMARY KEY,
    first_name VARCHAR(30), 
    last_name VARCHAR(30), 
    role_id INT, 
    manager_id INT 
);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;