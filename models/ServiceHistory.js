const mongoose = require("mongoose");

const serviceHistorySchema = mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ProductService",
    },
    serviceStatusId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ServiceStatus",
    },
    status: {
        type: Boolean,
        required: true,
        default: true
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

const serviceHistory = mongoose.model("ServiceHistory", serviceHistorySchema);

module.exports = serviceHistory;
