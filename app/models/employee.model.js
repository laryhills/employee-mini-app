const sql = require("./db.js");
// import { connection as sql } from "./db";

// constructor
const Employee = function(employee) {  
  this.fullName = employee.fullName
  this.email = employee.email
  this.mobile = employee.mobile
  this.city = employee.city
  this.gender = employee.gender
  this.departmentId = employee.departmentId
  this.hireDate = employee.hireDate
  this.isPermanent = employee.isPermanent
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO emp_tbl SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`created employee at ${new Date()}`);
    // console.log("created employee: ", { id: res.insertId, ...newEmployee });
    // result(null, { id: res.insertId, ...newEmployee });
    result(null, {status:"success"});
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT * FROM emp_tbl WHERE id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found employee: ", res[0]);
      console.log("found employee");
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT * FROM emp_tbl INNER JOIN dept_tbl ON emp_tbl.departmentId=dept_tbl.id_ ORDER by id DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log("employees: ", res);
    console.log("fetched employees");
    result(null, res);
  });
};

Employee.getDept = result => {
  sql.query("SELECT id_ as id, title FROM dept_tbl", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log("dept: ", res);
    console.log("fetched department");
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  let q = "UPDATE emp_tbl SET ? WHERE id = ?"
  let values = (employee)
  sql.query(q, [values, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }
    // console.log("updated employee: ", { id: id, ...employee });
    console.log(`updated employee at ${new Date()}`);
    // result(null, { id: id, ...employee });
    result(null, {status:"success"})
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM emp_tbl WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    // console.log("deleted employee with id: ", id);
    console.log(`deleted employee at ${new Date()}`);
    result(null, res);
  });
};

// Employee.removeAll = result => {
//   sql.query("DELETE FROM employees", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} employees`);
//     result(null, res);
//   });
// };

module.exports = Employee;