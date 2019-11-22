const mongoose = require("mongoose");
const chatroom = require("../schema/chatroom_model");
const message = require("../schema/message_model");

exports.getMessageList = function(req, res) {
  console.log("Print id  " + req.query.roomId);
  // var data = {
  //   // buyerId: req.query.buyerId,
  //   // orderId: req.query.orderId
  //   roomId: req.query.roomId
  // };

  message.find({ roomId: req.query.roomId }, function(err, doc) {
    if (doc) {
      console.log("doc found");
      console.log(doc);
      res.send(doc);
    } else {
      console.log("NO doc found");
      console.log(err);
    }
  });
};

exports.sendMessage = function(req, res) {
  var content = req.query.messages;
  var roomId = req.query.roomId;
  console.log(content);

  var today = new Date();

  const message1 = new message({
    _id: new mongoose.Types.ObjectId(),
    message: content,
    roomId: roomId,
    created: today
  });
  message1
    .save()
    .then(resul => {
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
};

exports.getChatRoom = function(req, res) {
  chatroom.find({}, function(err, doc) {
    if (doc) {
      console.log("doc found");
      console.log(doc);
      res.send(doc);
    } else {
      console.log("NO doc found");
      console.log(err);
    }
  });
};
