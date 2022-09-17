const sql = require("./db.js");
const configfile=require("../config/db.config");

var fs = require('fs');

// constructor
const Maintinance = function(maintinance) {
  this.userId = maintinance.userId;
  this.year = maintinance.year;
  this.month = maintinance.month;
  this.expenseName = maintinance.expenseName;
  this.amount = maintinance.amount;
  this.paidAmount = maintinance.paidAmount;
  this.description = maintinance.description;
  this.status = maintinance.status;
  this.type = maintinance.type;
  
};



Maintinance.create = (newData, result) => {

  sql.query("INSERT INTO soc_extra_maintenance  SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newData });
  });
};

Maintinance.bulkCreate = (newData, result) => {

  sql.query("INSERT INTO soc_extra_maintenance  SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newData });
  });
};


Maintinance.getAll = (keyword,result) => {
  let sqlQuery = 'SELECT c.name as uname, b.billName as bill , a.* FROM soc_socity_user as c JOIN   soc_extra_maintenance as a ON c.id=a.userId LEFT JOIN soc_extra_bill_name as b ON a.expenseName=b.id  WHERE a.status=1 AND a.year='+keyword.year+' AND a.month='+keyword.month+' AND a.type='+keyword.type;
  sql.query(sqlQuery, (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tt_review: ", sqlQuery);
    result(null, res);
  });
};



Maintinance.getAllFilter = (keyword,result) => {
  let condition =
  console.log(keyword,"_____________________________");
  let sqlQuery = 'SELECT c.name as uname, b.billName as bill , a.* FROM soc_socity_user as c JOIN   soc_extra_maintenance as a ON c.id=a.userId LEFT JOIN soc_extra_bill_name as b ON a.expenseName=b.id  WHERE a.status=1 AND a.year='+keyword.year+' AND a.month='+keyword.month+' AND a.type='+keyword.type;

  if(keyword?.user){
    sqlQuery +=" AND a.userId="+keyword.user;
  }
  if(keyword?.bill){
    sqlQuery +=" AND a.expenseName="+keyword.bill;
  }

  sqlQuery +=" ORDER BY a.id DESC LIMIT 0,299";


  console.log("query ::: ", sqlQuery);

  sql.query(sqlQuery, (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};



Maintinance.updateById = (id, newdata, result) => {
  sql.query(
    "UPDATE soc_extra_maintenance SET paidAmount= ?  WHERE id = ?",
    [newdata.amount,id],
    (err, res) => {
      if (err) {
         console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found review with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...newdata });
    }
  );
};

Maintinance.remove = (id, result) => {
  sql.query("DELETE FROM soc_extra_maintenance WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Review with the id
      result({ kind: "not_found" }, null);
      return;
    }

     console.log("deleted review with id: ", id);
    result(null, res);
  });
};

Maintinance.removeAll = result => {
  sql.query("DELETE FROM tt_review", (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(null, err);
      return;
    }

   //  console.log(`deleted ${res.affectedRows} tt_reviews`);
    result(null, res);
  });
};



Maintinance.findById = (keyword, result) => {
  let sqlQuery = 'SELECT b.billName as bill , a.* FROM  soc_extra_maintenance as a LEFT JOIN soc_extra_bill_name as b ON a.expenseName=b.id  WHERE a.status=1 AND a.year='+keyword.year+' AND a.month='+keyword.month+' AND a.userId='+keyword.uId;
  sql.query(sqlQuery, (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tt_review: ", sqlQuery);
    result(null, res);
  });
};

module.exports = Maintinance;
