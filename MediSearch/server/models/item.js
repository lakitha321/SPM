const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    pharmasist_email : {
        type : String,
        required : true
    },

    pharmasist_name : {
        type : String,
        required : true
    },

    price : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    },

    desc : {
        type : String,
        required : true
    }

});

const item = mongoose.model("item", itemSchema);

module.exports = item;