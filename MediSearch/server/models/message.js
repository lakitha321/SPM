const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({

    time : {
        type : String
    },

    sender : {
        type : String,
        required : true
    },

    reciever : {
        type : String,
        required : true
    },

    message : {
        type : String,
        required : true
    },

    group : {
        type : String,
        required : true
    },

    role : {
        type : String
    },

    area : {
        type : String
    }

});

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;