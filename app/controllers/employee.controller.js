const Employee = require("../models/employee.model");
// import Employee from "../models/employee.model"

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Employee
  const employee = new Employee({
    fullName: req.body.fullName,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city,
    departmentId:req.body.departmentId,
    gender: req.body.gender,
    hireDate: req.body.hireDate,
    isPermanent: req.body.isPermanent

  });

  // Save Employee in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    else res.send(data);
  });
};

// Retrieve Department from the database.
exports.dept = (req, res) => {
  Employee.getDept((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving departments."
      });
    else res.send(data);
  });
};

// Find a single Employee with a employeeId
exports.findOne = (req, res) => {
  Employee.findById(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.employeeId
        });
      }
    } else res.send(data);
  });
};

//Update a Employee identified by the employeeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!(req.body.fullName)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Employee.updateById(
    req.params.employeeId,
    new Employee(req.body), //removes field of id
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.employeeId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Employee with the specified employeeId in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.employeeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.employeeId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.employeeId
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};
