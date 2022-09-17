module.exports = app => {
  const users = require("../controllers/user.controller.js");

  // Create a new user
  // app.post("/add_user", users.create);

  // // Retrieve all users
  // app.get("/users", users.findAll);

  // // Retrieve a single user with userId
  // app.get("/user/:userId", users.findOne);

  // // Update a user with userId
  // app.put("/edit_user/:userId", users.update);

  // // Delete a user with userId
  // app.delete("/remove_user/:userId", users.delete);

  // // Create a new user
  // app.delete("/remove_users", users.deleteAll);

   app.post("/login", users.login);

  // // searching a single user with keyword
  app.get("/search/flatlist/:year/:month", users.search);
  app.get("/search/users/:keyword", users.userByType);
  app.get("/search/bill/:keyword", users.billBytype);
  app.post("/search/summary", users.summary);


};
