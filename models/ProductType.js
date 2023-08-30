const mongoose = require("mongoose");

const productTypeSchema = mongoose.Schema({
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

const productType = mongoose.model("ProductType", productTypeSchema);

module.exports = productType;
