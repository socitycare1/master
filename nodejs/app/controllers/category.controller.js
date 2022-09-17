const Category = require("../models/category.model.js");


// Retrieve all category from the database.
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(200).send({
        message:
          err.message || "Some error occurred while retrieving category.",
          code : 1001
      });
      else res.send({message:"success",code:1000,data:data});
  });
};



// Find a subacategorys with a Id
exports.categoryId = (req, res) => {
  Category.subcategoryById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Subcategory with categoryid ${req.params.categoryId}.`,
          code : 1001
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Subcategory with categoryid " + req.params.categoryId
        });
      }
    }      else res.send({message:"success",code:1000,data:data});

  });
}





