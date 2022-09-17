const sql = require("./db.js");

// constructor
const Contactus = function(contactus) {
  this.firstname = contactus.firstname;
  this.lastname = contactus.lastname;
  this.email = contactus.email;
  this.message = contactus.message;
  
  
};



Contactus.create = (newContactus, result) => {

  console.log("newContactus",newContactus);

  sql.query("INSERT INTO tt_contactus SET ?", newContactus, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created contactus: ", { id: res.insertId, ...newContactus });
    result(null, { id: res.insertId, ...newContactus });
  });
};

Contactus.findById = (contactusId, result) => {
  sql.query(`SELECT * FROM tt_contactus WHERE id = ${contactusId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found contactus: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Contactus.getAll = result => {
  sql.query("SELECT * FROM tt_contactus", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tt_contactus: ", res);
    result(null, res);
  });
};

Contactus.updateById = (id, contactus, result) => {
  sql.query(
    "UPDATE tt_contactus SET firstname = ?,lastname = ?, email = ?,message = ? WHERE id = ?",
    [contactus.firstname, contactus.lastname, contactus.email,contactus.message,id],
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

      console.log("updated contactus: ", { id: id, ...contactus });
      result(null, { id: id, ...contactus });
    }
  );
};

Contactus.remove = (id, result) => {
  sql.query("DELETE FROM tt_contactus WHERE id = ?", id, (err, res) => {
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

    console.log("deleted contactus with id: ", id);
    result(null, res);
  });
};

Contactus.removeAll = result => {
  sql.query("DELETE FROM tt_contactus", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tt_contactus`);
    result(null, res);
  });
};





module.exports = Contactus;
