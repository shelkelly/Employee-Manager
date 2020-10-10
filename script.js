const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "E122w920!",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

function promptUser() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "todo1",
                message: "What would you like to do?",
                choices: [
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Update Employee Roles"
                ]
            }
        ])
        .then(function(result) {
            switch (result.todo1) {
                // USE OF SWITCH CASE TO FIRE FUNCTION DEPENDING ON USER SELECTION
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Update Employee Roles":
                    updateEmployee();
                    break;
                    default:
                        quit();
            }
        })
}

promptUser();

function addDepartment() {
    inquirer
    .prompt ([
        {
            type: "input",
            name: "deptName",
            message: "Enter Department Name: "
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function(err, res) {
            if (err) throw err;
            console.table(res)
            promptUser()
        })
    })
}


function addRole() {
    inquirer
    .prompt ([
        {
            type: "input",
            name: "roleTitle",
            message: "Enter Role Title: "
        },
        {
            type: "input",
            name: "salary",
            message: "Enter Salary: $"
        },
        {
            type: "input",
            name: "deptID",
            message: "Enter Department ID: "
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleTitle, answer.salary, answer.deptID], function(err, res) {
            if (err) throw err;
            console.table(res)
            promptUser()
        })
    })
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter Employee's First Name: "
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter Employee's Last Name: "
        },
        {
            type: "input",
            name: "roleID",
            message: "Enter Employee's Role ID: "
        },
        {
            type: "input",
            name: "managerID",
            message: "Enter Employee's Manager ID: "
        }
    ])
    .then(function(answer) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res) {
            if (err) throw err;
            console.table(res)
            promptUser()
        })
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

function updateEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "employeeID",
            message: "Enter Employee's ID: "
        },
        {
           type: "input",
           name: "newRoleID",
           message: "Enter Employee's New Role ID: " 
        }
    ])
    .then(function(answer) {
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.newRoleID, answer.employeeID], function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        })
    })
}