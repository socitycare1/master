const sql = require("./db.js");
const configfile=require("../config/db.config");
var fs = require('fs');
const e = require("cors");


// constructor
const User = function(user) {
  this.firstName = user.firstname;
  this.lastName = user.lastname;
  this.email = user.email;
  this.password = user.password;
  this.mobile = user.mobile;
  this.image=user.imgData;  
  this.status = user.status;
};



User.create = (newUser, result) => {


 if(newUser.image[0].imgUrl){
   var image=newUser.image[0].imgUrl;
  var imageName=newUser.image[0].imgname;
  imageName = imageName.replace(/'/g, "\\'");
  var max=99999999;
  var base64Data = image.replace(/^data:image\/[a-z]+;base64,/,"");
  var path=configfile.File_path_profile;
  var imgName=Math.floor(Math.random() * Math.floor(max));
    imgName=imgName+'__'+imageName;
  console.log("path::::aaaaaa:::::::",path+'/'+imgName);
  fs.writeFile(path+'/'+imgName, base64Data, 'base64',function(err, data){
      if (err) console.log(err);
      console.log("Successfully Written to File.");
  });


  newUser.image=imgName;
	 
 }

  sql.query("INSERT INTO soc_login_user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM soc_login_user WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM soc_login_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("soc_login_user: ", res);
    result(null, res);
  });
};




User.updateById = (id, user, result) => {
	
	 if(user.image[0].imgUrl){
   var image=user.image[0].imgUrl;
  var imageName=user.image[0].imgname;
  imageName = imageName.replace(/'/g, "\\'");
  var max=99999999;
  var base64Data = image.replace(/^data:image\/[a-z]+;base64,/,"");
  var path=configfile.File_path_profile;
  var imgName=Math.floor(Math.random() * Math.floor(max));
    imgName=imgName+'__'+imageName;
  console.log("path::::aaaaaa:::::::",path+'/'+imgName);
  fs.writeFile(path+'/'+imgName, base64Data, 'base64',function(err, data){
      if (err) console.log(err);
      console.log("Successfully Written to File.");
  });


  user.image=imgName;
	 
 }
	console.log(user);
	
	
  sql.query(
    "UPDATE soc_login_user SET firstname = ?,middlename = ?, lastname = ?,email = ?,password = ?,old_password = ?,mobile = ?, address = ?, permanent_address= ?,office_address = ?,city = ?,state = ?,country = ?,active = ?,pincode = ?,product = ?,weight = ? , image =? WHERE id = ?",
    [user.firstName, user.lastName, user.middleName,user.email,user.password,user.old_password,user.mobile, user.address,user.permanent_address,user.office_address, user.city,user.state,user.country,user.active,user.pincode,user.product,user.weight,user.image,id],
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

     // console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM soc_login_user WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM soc_login_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} soc_login_users`);
    result(null, res);
  });
};

User.login = (newUser, result) => {

  let query='SELECT * FROM soc_login_user WHERE username="'+newUser.username+'" AND password="'+newUser.password+'"';


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });

};


User.search = (keyword, result) => {
var query='SELECT SUM(b.amount) as neddToPay, SUM(b.paidAmount) as paidBy,  SUM(b.amount) - SUM(b.paidAmount) as remaing ,  a.id as uId,  a.name as uname,a.flatNo as flat, c.billName as bill, b.* FROM `soc_socity_user` as a JOIN `soc_extra_maintenance` as b ON a.id=b.userId JOIN `soc_extra_bill_name` as c ON b.expenseName=c.id WHERE b.year='+keyword.year+' AND b.month='+keyword.month+' AND a.type=1 AND b.type=1 AND b.status=1 GROUP BY a.id  ORDER BY remaing DESC LIMIT 0,200';
 
//var query='SELECT a.id as uId,  a.name as uname,a.flatNo as flat, c.billName as bill, b.* FROM `soc_socity_user` as a JOIN `soc_extra_maintenance` as b ON a.id=b.userId JOIN `soc_extra_bill_name` as c ON b.expenseName=c.id WHERE b.year='+keyword.year+' AND b.month='+keyword.month+' AND a.type=1 AND b.type=1 AND b.status=1 ORDER BY a.`id` ASC LIMIT 0,200';
 
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      let count=0;
      // let group = res.reduce((r, a) => {
      //   r[a.uId] = [...r[a.uId] || [], a];
      //   return r;
      //  }, {});
      // //  let group = res.reduce((r, a) => {
      //   r[a.uname] = [...r[a.uname] || [], a];
      //   return r;
      //  }, {});

      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.summary = (keyword, result) => {

  if(keyword.searchType==1){
    query='SELECT a.id as uId,  a.name as uname,a.flatNo as flat, c.billName as bill, SUM(b.paidAmount) as tSum, b.type as mtype,b.description,b.year,b.month FROM `soc_socity_user` as a JOIN `soc_extra_maintenance` as b ON a.id=b.userId JOIN `soc_extra_bill_name` as c ON b.expenseName=c.id WHERE b.year='+keyword.year+' AND b.month='+keyword.month+' AND b.status=1 GROUP BY b.expenseName,b.type ORDER BY a.`id` ASC LIMIT 0,200';
  
  }else{
  var query='SELECT  SUM(b.paidAmount) as amountSum , b.year,b.month, b.type as mtype FROM `soc_extra_maintenance` as b  WHERE   b.status=1 GROUP BY   b.type  ';
    if(keyword.year){
      query +=" , b.year , b.month ORDER BY b.year DESC, b.month DESC " ;
    }
  }

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.length) {
        if(keyword.searchType==1){
          //   let group = res.reduce((r, a) => {
          //   r[a.mtype] = [...r[a.mtype] || [], a];
          //   return r;
          //   }, {});
          // return result(null, group);
           return result(null, res);

        }

        let t1={};
        let t2={};
        res.forEach(element => {
          let key=element.year+'_'+element.month;
            if(element.mtype==1){
              t1[key]=element.amountSum;      
            }else{
              t2[key]=element.amountSum;      
            }

        });

        //   let group = res.reduce((r, a) => {
        //   r[a.year] = [...r[a.year] || [], a];
        //   return r;
        //  }, {});


        return result(null,  {t1,t2});
        
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  
User.userByType = (keyword, result) => {

  var query="SELECT  name as label, id as value FROM `soc_socity_user` WHERE type="+keyword+" ORDER BY `id` ASC LIMIT 0,200 ";
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {

      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.billBytype = (keyword, result) => {

  var query="SELECT  billName as label, id as value FROM `soc_extra_bill_name` WHERE type="+keyword+" AND status=1  ORDER BY `id` ASC LIMIT 0,200 ";
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {

      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = User;
