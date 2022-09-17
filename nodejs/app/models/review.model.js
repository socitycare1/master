const sql = require("./db.js");
const configfile=require("../config/db.config");

var fs = require('fs');

// constructor
const Review = function(review) {
  this.company_id = review.company_id;
  this.user_id = review.user_id;
  this.review_id = review.review_id;
  this.count = review.count;
  this.created_by = review.created_by;
  this.modify_by = review.modify_by;
  this.status = review.status;
  this.bill_image=review.imgData;  
};



Review.create = (newReview, result) => {


  
  var image=newReview.bill_image[0].imgUrl;
  var imageName=newReview.bill_image[0].imgname;
  imageName = imageName.replace(/'/g, "\\'");
  var max=99999999;


  var base64Data = image.replace(/^data:image\/[a-z]+;base64,/,"");
  var path=configfile.File_path;
  var imgName=Math.floor(Math.random() * Math.floor(max));
    imgName=imgName+'__'+imageName;
  console.log("path:::::::::::",path+'/'+imgName);


  fs.writeFile(path+'/'+imgName, base64Data, 'base64',function(err, data){
      if (err) console.log(err);
      console.log("Successfully Written to File.");
  });




   newReview.bill_image=imgName;
//   console.log("newReview",newReview);

  sql.query("INSERT INTO tt_review SET ?", newReview, (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(err, null);
      return;
    }

   //  console.log("created review: ", { id: res.insertId, ...newReview });
    result(null, { id: res.insertId, ...newReview });
  });
};


Review.getAll = result => {
  sql.query("SELECT  SUM(a.count) as totalSUM, COUNT(a.company_id) as totalCOUNT , a.*,b.* FROM `tt_review` as a LEFT JOIN tt_company as b ON a.company_id=b.id Group By b.id", (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(null, err);
      return;
    }

   //  console.log("tt_review: ", res);
    result(null, res);
  });
};

Review.updateById = (id, review, result) => {
  sql.query(
    "UPDATE tt_review SET company_id= ?,user_id = ?, review_id = ?,count = ?,created_by = ?,modify_by = ?,status = ? WHERE id = ?",
    [review.company_id, review.user_id, review.review_id,review.count,review.created_by,review.modify_by,review.status,id],
    (err, res) => {
      if (err) {
       //  console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found review with the id
        result({ kind: "not_found" }, null);
        return;
      }

     //  console.log("updated review: ", { id: id, ...review });
      result(null, { id: id, ...review });
    }
  );
};

Review.remove = (id, result) => {
  sql.query("DELETE FROM tt_review WHERE id = ?", id, (err, res) => {
    if (err) {
     //  console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Review with the id
      result({ kind: "not_found" }, null);
      return;
    }

   //  console.log("deleted review with id: ", id);
    result(null, res);
  });
};

Review.removeAll = result => {
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



Review.findById = (reviewId, result) => {
  sql.query(`SELECT * FROM  tt_review as a  JOIN tt_company as b ON a.company_id=b.id WHERE b.id = ${reviewId}`, (err, res) => {
    if (err) {
       console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     //  console.log("found review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Review with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Review;
