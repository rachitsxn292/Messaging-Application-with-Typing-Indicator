
const mongoose=require('mongoose');

const message_schema=mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    roomId:mongoose.Schema.Types.ObjectId,
    // userId:mongoose.Schema.Types.ObjectId,
    message:String,
    created:Date

    

});

module.exports=mongoose.model('message_model',message_schema);