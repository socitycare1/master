const Review = require("../models/review.model.js");

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const review = new Review({
    company_id: req.body.company_id,
    user_id: req.body.user_id,
    review_id: req.body.review_id,
    count: req.body.count,
    created_by: req.body.created_by,
    modify_by: req.body.modify_by,
    status: req.body.status,
    imgData:req.body.imgData
    
  });

  // Save User in the database
  Review.create(review, (err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while creating the Review.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
    });
};

// Retrieve all Review from the database.
exports.findAll = (req, res) => {
  Review.getAll((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving review.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
  });
}; 

// Find a single User with a userId
exports.findOne = (req, res) => {
  Review.findById(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.reviewId}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.reviewId
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


  Review.updateById(
    req.params.reviewId,
    new Review(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Review with id ${req.params.reviewId}.`
          });
        } else {
          res.status(200).send({
            message: "Error updating Review with id " + req.params.reviewId,
            code : 1001
          });
        }
      }       else res.send({message:"success",code:1000,data:data});

    }
  );
};

// Delete a Review with the specified ReviewId in the request
exports.delete = (req, res) => {
  Review.remove(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Review with id ${req.params.ReviewId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Review with id " + req.params.ReviewId,
          code : 1001
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};

// Delete all Review from the database.
exports.deleteAll = (req, res) => {
  Review.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Reviews."
      });
    else res.send({ message: `All Reviews were deleted successfully!` });
  });
};

// Find a single User with a Id
exports.count = (req, res) => {
  Review.countById(req.params.companyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.companyId}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.companyId
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
};


