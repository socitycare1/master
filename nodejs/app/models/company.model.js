const sql = require("./db.js");

// constructor
const Company = function(company) {
  this.name = company.name;
  this.address = company.address;
  this.landmark = company.landmark;
  this.city = company.city;
  this.state = company.state;
  this.country = company.country;
  this.category = company.category;
  this.subcategory = company.subcategory;
  
};



Company.create = (newCompany, result) => {

  console.log("newCompany",newCompany);

  sql.query("INSERT INTO tt_company SET ?", newCompany, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created company: ", { id: res.insertId, ...newCompany });
    result(null, { id: res.insertId, ...newCompany });
  });
};

Company.findById = (companyId, result) => {
  sql.query(`SELECT * FROM tt_company WHERE id = ${companyId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found company: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Company.getAll = result => {
  sql.query("SELECT * FROM tt_company", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tt_company: ", res);
    result(null, res);
  });
};

Company.updateById = (id, company, result) => {
  sql.query(
    "UPDATE tt_company SET name = ?,address = ?, landmark = ?,city = ?,state = ?,country = ?,category = ?,subcategory = ? WHERE id = ?",
    [company.name, company.address, company.landmark,company.city,company.state,company.country,company.category,company.subcategory,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated company: ", { id: id, ...company });
      result(null, { id: id, ...company });
    }
  );
};

Company.remove = (id, result) => {
  sql.query("DELETE FROM tt_company WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted company with id: ", id);
    result(null, res);
  });
};

Company.removeAll = result => {
  sql.query("DELETE FROM tt_company", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tt_company`);
    result(null, res);
  });
};





module.exports = Company;
