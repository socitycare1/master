const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    old_password: req.body.old_password,
    mobile: req.body.mobile,
    address: req.body.address,
    permanent_address: req.body.permanent_address,
    office_address: req.body.office_address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    active: req.body.active,
    pincode: req.body.pincode,
    product: req.body.product,
    weight: req.body.weight,
    imgData:req.body.imgData
  
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while creating the User.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving users.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
  });
}; 

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(200).send({
            message: "Error updating User with id " + req.params.userId,
            code : 1001
          });
        }
      }       else res.send({message:"success",code:1000,data:data});

    }
  );
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.UserId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.UserId,
          code : 1001
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

// Create and Save a new user
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Customer in the database
  User.login(req.body, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "username and password not found!!",
          code : 1001
      });
    else res.send({message:"success",code:1000,data:data});
  });
};

// search a single User with a userId
exports.search = (req, res) => {
  User.search(req.params, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id "
        });
      }
    }else {
      res.send({message:"success",code:1000,data:data});
    } 

  });
};

// search a single User with a userId
exports.summary = (req, res) => {
  User.summary(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id "
        });
      }
    }else {
      res.send({message:"success",code:1000,data:data});
    } 

  });
};



// search a single User with a userId
exports.userByType = (req, res) => {
  User.userByType(req.params.keyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.keyword}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.keyword
        });
      }
    }else {
      res.send({message:"success",code:1000,data:data});
    } 

  });
};



// search a single User with a userId
exports.billBytype = (req, res) => {
  User.billBytype(req.params.keyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.keyword}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.keyword
        });
      }
    }else {
      res.send({message:"success",code:1000,data:data});
    } 

  });
};