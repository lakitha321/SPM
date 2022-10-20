const mongoose = require('mongoose');

const PharmasistSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    nic : {
        type : String,
        required : true
    },

    mobile : {
        type : String,
        required : true
    },

    shop_name : {
        type : String
    },

    shop_district : {
        type : String
    },

    shop_location : {
        type : String
    },

    password : {
        type : String,
        required : true
    }
});

const Pharmasist = mongoose.model("pharmasist", PharmasistSchema);

module.exports = Pharmasist;