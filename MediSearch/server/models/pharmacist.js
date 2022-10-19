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
        type : String,
        required : true
    },

    shop_district : {
        type : String,
        required : true
    },

    shop_location : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    }
});

const Pharmasist = mongoose.model("pharmasist", PharmasistSchema);

module.exports = Pharmasist;