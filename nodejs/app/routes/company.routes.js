module.exports = app => {
  const companys = require("../controllers/company.controller.js");

  // Create a new company
  app.post("/add_company", companys.create);

  // Retrieve all companys
  app.get("/companys", companys.findAll);

  // Retrieve a single company with companyId
  app.get("/company/:companyId", companys.findOne);

  // Update a company with companyId
  app.put("/edit_company/:companyId", companys.update);

  // Delete a company with companyId
  app.delete("/remove_company/:companyId", companys.delete);

  // Create a new company
  app.delete("/remove_companys", companys.deleteAll);

  

};
