module.exports = app => {
  const maintinance = require("../controllers/maintinance.controller.js");

  // Create a new review
  app.post("/submitCollection", maintinance.create);
  app.post("/submitAllCollection", maintinance.bulkCreate);
  app.post("/search/mlist", maintinance.findAllFilter);

  // Retrieve all reviews
  app.get("/search/mlist/:year/:month/:type", maintinance.findAll);
  app.get("/search/mlistbyuser/:year/:month/:uId", maintinance.findOne);

  // // Retrieve a single review with reviewId
//   app.get("/search/mlist/:type", reviews.findOne);

  // // Update a review with reviewId
   app.put("/update/mlist/:id", maintinance.update);

  // // Delete a review with reviewId
   app.delete("/delete/mlist/:listId", maintinance.delete);

  // // Create a new review
  // app.delete("/remove_reviews", reviews.deleteAll);

  // // Retrieve a count review with reviewId
  // app.get("/compnayreview/:companyId", reviews.count);
  
  
};
