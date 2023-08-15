const fs = require('fs');
const express = require('express');
const inquirer = require("inquirer");
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const sqL = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db'
},
console.log('Connected to the employee_db')
);

function select(query){
    sqL.query(`SELECT * FROM ${query}`, (err, res) =>{
        if(err) throw err;
        console.table(res);
    });
}

function addDep(){
    inquirer.prompt({
        type: 'input',
        name: 'newDep',
        message: "What department do you want to add?"
    })
    .then((response) => {
        sqL.query(`INSERT INTO department (name) VALUES ('${response.newDep}')`
         ) 
         console.log("Department added!");
         viewList();
    });
}

function roleAdd(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the name of the role?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary of the role?"
        },
        {
            type: 'input',
            name: 'department_id',
            message: "What is the department id for the role?"
        }
    ])
    .then((response) => {
        sqL.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${res.title}', '${res.salary}', '${res.department_id}')`, (err,res) => {
            if(err) throw err;
            console.log("Role added");
            viewList();
        });
    });
}
function empAdd(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's role id?"
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the employee's manager's id?"
        }
    ])
    .then((response) => {
        sqL.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', '${response.role_id}', '${response.manager_id}')`, (err, res) => {
            if(err) throw err;
            console.log("Employee added");
            viewList();
        });
    });
}



function viewList(){
    inquirer.prompt({
        type: 'list',
        name: 'view',
        message: "What would you like to view?",
        choices: [
            'Department',
            'Roles',
            'Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employees by Manager',
            'View Employees by Manager',
            'View Employees by Department',
            'Delete Department',
            'Delete Role',
            'Delete Employee',
        ]
    })
    .then((response) => {
        if(response.view === 'Department'){
            select('department');
        }
        else if(response.view === 'Roles'){
            select('roles');
        }
        else if(response.view === 'Employees'){
            select('employees');
        }
        else if(response.view === 'Add Department') {
            addDep();
        }
         else if(response.view === 'Add Role') {
            roleAdd();
        }
         else if(response.view === 'Add Employee') {
            empAdd();
         }
        });
    };

viewList()

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});