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


