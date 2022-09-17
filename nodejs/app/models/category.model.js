const sql = require("./db.js");

// constructor
const Category = function(category) {
  this.cat_name = category.cat_name;
  this.cat_title = category.cat_title;
  this.status = category.status;
  
};

Category.subcategoryById = (categoryId, result) => {
  sql.query(`SELECT a.* FROM tt_subcategory as a join tt_category as b ON a.cat_id=b.id where b.id = ${categoryId}  `, (err, res) => {
    if (err) {
       console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Category.getAll = result => {
  sql.query("SELECT * FROM tt_category", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};




module.exports = Category;
