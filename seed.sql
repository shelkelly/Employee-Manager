-- Insert a set of records.
	SELECT * FROM department;
    SELECT * FROM role;
    SELECT * FROM employee;

    INSERT INTO department (name)
	VALUES ('Management');

    INSERT INTO role (title, salary, department_id)
    VALUES ('Store Manager', '80000', '5');
    
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Jane', 'Doe', '2', '1');
    
    