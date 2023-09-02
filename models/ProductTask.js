const mongoose = require("mongoose");

const productTaskSchema = mongoose.Schema({
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    content: {
        type: String,
        required: true,
    },
    isComplate: {
        type: Boolean,
        required: true,
        default: false
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

const productTask = mongoose.model("ProductTask", productTaskSchema);

module.exports = productTask;
