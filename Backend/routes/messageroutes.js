var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "messageApp";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};


const mongoose= require('mongoose');
const chatroom =require('../schema/chatroom_model');
const message =require('../schema/message_model');

exports.getMessageList = function(req, res) {
  console.log("Print id  " + req.query.roomId);
  // var data = {
  //   // buyerId: req.query.buyerId,
  //   // orderId: req.query.orderId
  //   roomId: req.query.roomId
  // };


  message.find({roomId:req.query.roomId},function(err,doc){

    if(doc)
    {
      console.log("doc found");
      console.log(doc);
      res.send(doc);
    }else{
      console.log("NO doc found");
      console.log(err);
    }

  });


  // MongoClient.connect(url, options1, function(err, client) {
  //   assert.equal(null, err);
  //   console.log("Connected correctly to MongoDB server.");
  //   const db = client.db(dbName);
  //   mongodb = db;
  //   db.collection("messages")
  //     .find({ id: data.roomId })
  //     .toArray(function(err, result) {
  //       if (err) throw err;
  //       // console.log(result);
  //       res.send(result);
  //       //db.close();
  //     });
  // });
};

exports.sendMessage = function(req, res) {
  var content = req.query.messages;
  var roomId = req.query.roomId;
console.log(content);

var today = new Date();


const message1=new message({

  _id: new mongoose.Types.ObjectId(),
  message: content,
  roomId:roomId,
  created:today

});
message1.save().then(resul =>{
  console.log(resul);
  console.log("message enrolled");
  res.send({
            code: 200,
            success: "User registered sucessfully"
          });
})
.catch(err => {
  console.log(err);
 

});

  // MongoClient.connect(url, options1, function(err, client) {
  //   assert.equal(null, err);
  //   console.log("Connected correctly to MongoDB server.");
  //   const db = client.db(dbName);
  //   mongodb = db;
  //   db.collection("messages").insertOne(content, function(err, result) {
  //     assert.equal(err, null);
  //     console.log("Inserted message for " + content.id);
  //   });
  // });
};

exports.getChatRoom = function(req, res) {

  chatroom.find({},function(err,doc){

    if(doc)
    {
      console.log("doc found");
      console.log(doc);
      res.send(doc);
    }else{
      console.log("NO doc found");
      console.log(err);
    }

  });

  // MongoClient.connect(url, options1, function(err, client) {
  //   assert.equal(null, err);
  //   console.log("Connected correctly to MongoDB server.");
  //   const db = client.db(dbName);
  //   mongodb = db;
  //   db.collection("customers")
  //     .find({})
  //     .toArray(function(err, result) {
  //       if (err) throw err;
  //       //var myCart = result.query.userId;
  //       // console.log(result);
  //       res.send(result);
  //       //db.close();
  //     });
  // });
};
