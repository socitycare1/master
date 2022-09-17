module.exports = app => {
  const contactuss = require("../controllers/contactus.controller.js");

  // Create a new contactus
  app.post("/add_contactus", contactuss.create);

  // Retrieve all contactuss
  app.get("/contactuss", contactuss.findAll);

  // Retrieve a single contactus with contactusId
  app.get("/contactus/:contactusId", contactuss.findOne);

  // Update a contactus with contactusId
  app.put("/edit_contactus/:contactusId", contactuss.update);

  // Delete a contactus with contactusId
  app.delete("/remove_contactus/:contactusId", contactuss.delete);

  // Create a new contactus
  app.delete("/remove_contactuss", contactuss.deleteAll);

  

};
