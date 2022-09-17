const Company = require("../models/company.model.js");

// Create and Save a new company
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a company
  const company = new Company({
    name: req.body.name,
    address: req.body.address,
    landmark: req.body.landmark,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    category: req.body.category,
    subcategory: req.body.subcategory,
  });

  // Save company in the database
  Company.create(company, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while creating the company.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
    });
};

// Retrieve all company from the database.
exports.findAll = (req, res) => {
  Company.getAll((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving company.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
  });
}; 

// Find a single User with a companyId
exports.findOne = (req, res) => {
  Company.findById(req.params.companyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Company with id ${req.params.companyId}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Company with id " + req.params.companyId
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Update a company identified by the companyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Company.updateById(
    req.params.companyId,
    new Company(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${req.params.companyId}.`
          });
        } else {
          res.status(200).send({
            message: "Error updating Company with id " + req.params.companyId,
            code : 1001
          });
        }
      }       else res.send({message:"success",code:1000,data:data});

    }
  );
};

// Delete a User with the specified companyId in the request
exports.delete = (req, res) => {
  Company.remove(req.params.companyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Company with id ${req.params.CompanyId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Company with id " + req.params.CompanyId,
          code : 1001
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Company.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all company."
      });
    else res.send({ message: `All companys were deleted successfully!` });
  });
};



