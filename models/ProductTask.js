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
    status: {
        type: Boolean,
        required: true,
        default: false
    },
},
    { timestamps: true }
);

const productTask = mongoose.model("ProductTask", productTaskSchema);

module.exports = productTask;
