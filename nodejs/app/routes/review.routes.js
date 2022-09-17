module.exports = app => {
  const reviews = require("../controllers/review.controller.js");

  // Create a new review
  app.post("/add_review", reviews.create);

  // Retrieve all reviews
  app.get("/reviews", reviews.findAll);

  // Retrieve a single review with reviewId
  app.get("/review/:reviewId", reviews.findOne);

  // Update a review with reviewId
  app.put("/edit_review/:reviewId", reviews.update);

  // Delete a review with reviewId
  app.delete("/remove_review/:reviewId", reviews.delete);

  // Create a new review
  app.delete("/remove_reviews", reviews.deleteAll);

  // Retrieve a count review with reviewId
  app.get("/compnayreview/:companyId", reviews.count);
  
  
};
