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
        "View department",
        "View role",
        "View employee",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View department":
        departmentSearch();
        break;

      case "View role":
        roleSearch();
        break;

      case "View employee":
        employeeSearch();
        break;
      }
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




// function namesSearch() {
//   inquirer
//     .prompt({
//       name: "names",
//       type: "input",
//       message: "What names would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.names);
//       connection.query("SELECT * FROM department WHERE ?", { names: answer.names }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || names: " +
//             res[0].names +
//             " || department: " +
//             res[0].department +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }

// function namesAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "department",
//       type: "input",
//       message: "What department would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, department.names, department.department ";
//       query += "FROM top_albums INNER JOIN department ON (top_albums.department = department.department AND top_albums.year ";
//       query += "= department.year) WHERE (top_albums.department = ? AND department.department = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.department, answer.department], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             i+1 + ".) " +
//               "Year: " +
//               res[i].year +
//               " Album Position: " +
//               res[i].position +
//               " || department: " +
//               res[i].department +
//               " || names: " +
//               res[i].names +
//               " || Album: " +
//               res[i].album
//           );
//         }

//         runSearch();
//       });
//     });