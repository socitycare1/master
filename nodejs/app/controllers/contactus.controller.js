const Contactus = require("../models/contactus.model.js");

// Create and Save a new contactus
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a contactus
  const contactus = new Contactus({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    message: req.body.message,
  });

  // Save contactus in the database
  Contactus.create(contactus, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while creating the contactus.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
    });
};

// Retrieve all contactus from the database.
exports.findAll = (req, res) => {
  Contactus.getAll((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving contactus.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
  });
}; 

// Find a single User with a contactusId
exports.findOne = (req, res) => {
  Contactus.findById(req.params.contactusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contactus with id ${req.params.contactusId}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Contactus with id " + req.params.contactusId
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Update a contactus identified by the contactusId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Contactus.updateById(
    req.params.contactusId,
    new Contactus(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Contactus with id ${req.params.contactusId}.`
          });
        } else {
          res.status(200).send({
            message: "Error updating Contactus with id " + req.params.contactusId,
            code : 1001
          });
        }
      }       else res.send({message:"success",code:1000,data:data});

    }
  );
};

// Delete a User with the specified contactusId in the request
exports.delete = (req, res) => {
  Contactus.remove(req.params.contactusId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Contactus with id ${req.params.ContactusId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Contactus with id " + req.params.ContactusId,
          code : 1001
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Delete all contactuss from the database.
exports.deleteAll = (req, res) => {
  Contactus.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contactus."
      });
    else res.send({ message: `All contactuss were deleted successfully!` });
  });
};



