const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
},
    { timestamps: true }
);

const customer = mongoose.model("Customer", customerSchema);

module.exports = customer;
