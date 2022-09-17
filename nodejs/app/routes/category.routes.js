module.exports = app => {
  const categorys = require("../controllers/category.controller.js");

  // Retrieve a  subcategory with categoryId
  app.get("/category/:categoryId", categorys.categoryId);

  // Retrieve all categorys
  app.get("/categorys", categorys.findAll);
  
  
};