const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({

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

    district : {
        type : String
    },

    password : {
        type : String,
        required : true
    }

});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;