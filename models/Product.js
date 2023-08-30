const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ProductType",
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ProductBrand",
    },
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

const product = mongoose.model("Product", productSchema);

module.exports = product;
