const mongoose = require("mongoose");

const serviceStatusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

const serviceStatus = mongoose.model("ServiceStatus", serviceStatusSchema);

module.exports = serviceStatus;
