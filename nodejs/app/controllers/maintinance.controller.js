const Maintinance = require("../models/maintinance.model.js");

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a User
  const maintinance = new Maintinance({
    userId: req.body.user,
    year: req.body.year,
    month: req.body.month,
    expenseName: req.body.bill,
    amount: req.body.amount,
    paidAmount: req.body.paidAmount,
    status: req.body.status,
    type: req.body.type,
    description:req.body.description
    
  });

  // Save User in the database
  Maintinance.create(maintinance, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while creating the Review.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
    });
};


// Create and Save a new Review
exports.bulkCreate = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  req.body.user.forEach(element => {
    if(element.value > 0){
      const maintinance = new Maintinance({
        userId: element.value,
        year: req.body.year,
        month: req.body.month,
        expenseName: req.body.bill,
        amount: req.body.amount,
        paidAmount: req.body.paidAmount,
        status: req.body.status,
        type: req.body.type,
        description:req.body.description
        
      });
    
      // Save User in the database
      Maintinance.bulkCreate(maintinance, (err, data) => {
        if (err)
          res.status(200).send({
            message:
              err.message || "Some error occurred while creating the Review.",
              code : 1001
          });
//          else res.send({message:"success",code:1000,data:data});
        });
    

    }
  });

   res.send({message:"success",code:1000,data:[]});

//  Create a User
  

};


// Retrieve all Review from the database.
exports.findAll = (req, res) => {
  Maintinance.getAll(req.params,(err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving review.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
  });
}; 

// Retrieve all Review from the database.
exports.findAllFilter = (req, res) => {
  Maintinance.getAllFilter(req.body,(err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving review.",
          code : 1001
      });
      else {
        res.send({message:"success",code:1000,data:data});

      } 
  });
}; 


// Find a single User with a userId
exports.findOne = (req, res) => {
  Maintinance.findById(req.params, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.uid}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.uId
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


  Maintinance.updateById(
    req.params.id,
    new Maintinance(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Review with id ${req.params.id}.`
          });
        } else {
          res.status(200).send({
            message: "Error updating Review with id " + req.params.id,
            code : 1001
          });
        }
      }       else res.send({message:"success",code:1000,data:data});

    }
  );
};

// Delete a Review with the specified ReviewId in the request
exports.delete = (req, res) => {
  Maintinance.remove(req.params.listId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found database with id ${req.params.listId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Review with id " + req.params.listId,
          code : 1001
        });
      }
    } else res.send({message:"success",code:1000,data:data});

  });
};

// // Delete all Review from the database.
// exports.deleteAll = (req, res) => {
//   Maintinance.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Reviews."
//       });
//     else res.send({ message: `All Reviews were deleted successfully!` });
//   });
// };

// // Find a single User with a Id
// exports.count = (req, res) => {
//   Maintinance.countById(req.params.companyId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with id ${req.params.companyId}.`,
//           code : 1001
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving User with id " + req.params.companyId
//         });
//       }
//     }      else res.send({message:"success",code:1000,data:data});

//   });
// };


