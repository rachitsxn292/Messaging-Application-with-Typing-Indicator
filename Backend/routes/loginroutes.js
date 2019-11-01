// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "127.0.0.1", //3306
//   user: "root",
//   password: "123",
//   database: "messagingApp"
// });
// connection.connect(function(err) {
//   if (!err) {
//     console.log("Database is connected ... nn");
//   } else {
//     console.log("Error connecting database ... nn" + err);
//   }
// });


const mongoose= require('mongoose');
const user =require('../schema/user_model');
exports.register = function(req, res) {

  var today = new Date();


  const user1=new user({

    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    isTyping:false,
    created:today

  });
  user1.save().then(resul =>{
    console.log(resul);
    console.log("user enrolled");
    res.send({
              code: 200,
              success: "User registered sucessfully"
            });
  })
  .catch(err => {
    console.log(err);
   
  
  });
};
// var id = null; //mySQL auto generate unique ID starting from null
// exports.register = function(req, res) {
//   // console.log("req",req.body);
//   var today = new Date();
//   console.log("Print here + " + req.body.cuisine + req.body.name);
//   var owner = {
//     name: req.body.name,
//     id: id,
//     email: req.body.email,
//     password: req.body.password,
//     created: today
//   };
//   connection.query("INSERT INTO owner SET ?", owner, function(
//     error,
//     results,
//     fields
//   ) {
//     if (error) {
//       console.log("error ocurred", error);
//       res.send({
//         code: 401,
//         failed: "error ocurred"
//       });
//     } else {
//       console.log("The solution is: ", results);
//       res.send({
//         code: 200,
//         success: "User registered sucessfully"
//       });
//     }
//   });
// };

exports.login = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("in login");





  user.find({email:req.body.email},function(err,doc){

    if(doc)
    {



      console.log("doc found");
      console.log(doc);
      console.log(doc[0].name);
var user=doc[0];
if(user.password==password)
{

  res.send({
    id: user._id,
    firstName: user.name,
    lastName: "",
    email: user.email
  });
  res.end("sucessfull login");

}else{
  
  console.log("password doesnt match");
  console.log("error ocurred", err);
  res.writeHead(401, {
    "Content-Type": "text/plain"
  });
  res.end("Fail login");

}

    }else{
      console.log("Email does not exist");
      console.log("error ocurred", err);
      res.writeHead(401, {
        "Content-Type": "text/plain"
      });
      res.end("Fail login");
    }
  });











  // connection.query("SELECT * FROM owner WHERE email = ?", [email], function(
  //   error,
  //   results,
  //   fields
  // ) {
  //   console.log("backedn received email is", email);
  //   if (error) {
  //     console.log("error ocurred", error);
  //     res.writeHead(401, {
  //       "Content-Type": "text/plain"
  //     });
  //     res.end("Fail login");
  //   } else {
  //     // console.log('The solution is: ', results);
  //     if (results.length > 0) {
  //       console.log(results[0].password);
  //       if (results[0].password == password) {
  //         var user = results[0];
  //         console.log("USER IN BACK");
  //         console.log(user);
  //         res.send({
  //           id: user.id,
  //           firstName: user.name,
  //           lastName: "",
  //           email: user.email
  //         });
  //         res.end("sucessfull login");
  //       } else {
  //         console.log("Email and password does not match");
  //         console.log("error ocurred", error);
  //         res.writeHead(401, {
  //           "Content-Type": "text/plain"
  //         });
  //         res.end("Fail login");
  //       }
  //     } else {
  //       console.log("Email does not exits");
  //       console.log("error ocurred", error);
  //       res.writeHead(401, {
  //         "Content-Type": "text/plain"
  //       });
  //       res.end("Fail login");
  //     }
  //   }
  // });
};
