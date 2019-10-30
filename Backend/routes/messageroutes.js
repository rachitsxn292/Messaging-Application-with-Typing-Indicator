var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "messageApp";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

exports.getMessageList = function(req, res) {
  console.log("Print id  " + req.query.roomId);
  var data = {
    // buyerId: req.query.buyerId,
    // orderId: req.query.orderId
    roomId: req.query.roomId
  };
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("messages")
      .find({ id: data.roomId })
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        //db.close();
      });
  });
};

exports.sendMessage = function(req, res) {
  var content = req.query.messages;
  var roomId = req.query.roomId;
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("messages").insertOne(content, function(err, result) {
      assert.equal(err, null);
      console.log("Inserted message for " + content.id);
    });
  });
};

exports.getChatRoom = function(req, res) {
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("customers")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        //var myCart = result.query.userId;
        // console.log(result);
        res.send(result);
        //db.close();
      });
  });
};
