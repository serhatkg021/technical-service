const mongoose = require("mongoose");

const serviceStatusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    lastUpdatedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: "User",
    }
},
    { timestamps: true }
);

const serviceStatus = mongoose.model("ServiceStatus", serviceStatusSchema);

module.exports = serviceStatus;
