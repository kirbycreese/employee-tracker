//requiring technologies used
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

//creates connection to mysql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "cosmo120",
  database: "employeesDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Delete department",
        "Delete role",
        "Delete employee",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add department":
        departmentAdd();
        break;

      case "Add role":
        roleAdd();
        break;

      case "Add employee":
        employeeAdd();
        break;

      case "View department":
        departmentSearch();
        break;

      case "View role":
        roleSearch();
        break;

      case "View employee":
        employeeSearch();
        break;

        case "Delete department":
        departmentDelete();
        break;

        case "Delete role":
        roleDelete();
        break;

        case "Delete employee":
        employeeDelete();
        break;
      }
    });
}

function departmentAdd() {
inquirer
.prompt([
  {
    name: "department",
    type: "input",
    message: "What is the name of the department you would like to create?"
  }
])
.then(function(answer) {
  connection.query(
    "INSERT INTO department SET ?",
    {
      names: answer.department
    },
    function(err) {
      if (err) throw err;
      console.log(answer,"Your department was created successfully!");
      
      runSearch();
    }
  );
});
}


function roleAdd() {
  inquirer
    .prompt([
      {
        name: "roleTitle",
        type: "input",
        message: "What is the title of the role you would like to add?"
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the salary of this role?"
      },
      {
        name: "departmentID",
        type: "input",
        message: "What is the department ID of this role?",
        
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.roleTitle,
          salary: answer.roleSalary,
          department_id: answer.departmentID || 0
        },
        function(err) {
          if (err) throw err;
          console.log(answer,"Your employee role was created successfully!");
          runSearch();
        }
      );
    });
}

function employeeAdd() {
  inquirer
    .prompt([
      {
        name: "employeeFirstName",
        type: "input",
        message: "What is the first name of the employee you would like to add?"
      },
      {
        name: "employeeLastName",
        type: "input",
        message: "What is the last name of this employee?"
      },
      {
        name: "employeeRoleID",
        type: "input",
        message: "What is the ID of the role belonging to this employee?",
        
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employeeFirstName,
          last_name: answer.employeeLastName,
          role_id: answer.employeeRoleID || 0
        },
        function(err) {
          if (err) throw err;
          console.log(answer,"Your employee was created successfully!");
          runSearch();
        }
      );
    });
}

function departmentSearch() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the department you would like to view?"
    })
    .then(function(answer) {
      var query = "SELECT id, names FROM department WHERE ?";
      connection.query(query, { department: answer.department }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Names: " + res[i].names);
        }
        runSearch();
      });
    });
}

function roleSearch() {
  inquirer
    .prompt({
      name: "role",
      type: "input",
      message: "What is the name of the role you would like to view?"
    })
    .then(function(answer) {
      var query = "SELECT id, title, salary, departmentID FROM department WHERE ?";
      connection.query(query, { role: answer.role }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].departmentID);
        }
        runSearch();
      });
    });
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "What is the name of the employee you would like to view?"
    })
    .then(function(answer) {
      var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee WHERE ?";
      connection.query(query, { employee: answer.employee }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name) + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id;
        }
        runSearch();
      });
    });
}


function departmentDelete() {
  inquirer
    .prompt({
      name: "deleteDepartment",
      type: "input",
      message: "What is the name of the department you would like to delete?"
    })
.then(function(answer) {
  connection.query(
    "DELETE FROM department WHERE ?",
    {
      names: answer.deleteDepartment
    },
    function(err, res) {
      if (err) throw err;
      console.log(answer,"department deleted!");
      runSearch();
    }
    );
  });
}

function roleDelete() {
  inquirer
    .prompt({
      name: "deleteRole",
      type: "input",
      message: "What is the title of the role you would like to delete?"
    })
.then(function(answer) {
  connection.query(
    "DELETE FROM roles WHERE ?",
    {
      title: answer.deleteRole
    },
    function(err, res) {
      if (err) throw err;
      console.log(answer,"role deleted!");
      runSearch();
    }
    );
  });
}

function employeeDelete() {
  inquirer
    .prompt(
      {
        name: "deleteEmployeeFirst",
        type: "input",
        message: "What is the FIRST name of the employee you would like to delete?"
      },
      {
        name: "deleteEmployeeLast",
        type: "input",
        message: "What is the LAST name of this employee?"
      },
    )
.then(function(answer) {
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      first_name: answer.deleteEmployeeFirst,
      last_name: answer.deleteEmployeeLast
    },
    function(err, res) {
      if (err) throw err;
      console.log(answer,"role deleted!");
      runSearch();
    }
    );
  });
}
