const mongoose = require("mongoose");

const serviceStatusEventSchema = mongoose.Schema({
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ServiceStatus",
    },
    name: {
        type: String,
        required: true,
    },
    mailContent: {
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

const serviceStatusEvent = mongoose.model("ServiceStatusEvent", serviceStatusEventSchema);

module.exports = serviceStatusEvent;
