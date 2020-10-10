DROP DATABASE IF EXISTS employees_db;

-- Create the database movie_planner_db and specified it for use.
CREATE DATABASE employees_db;

USE employees_db;

-- Create the table plans.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
	id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,2) NULL,
    department_id int,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id int,
    manager_id int,
    PRIMARY KEY (id)
    );
    
