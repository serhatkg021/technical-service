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
    }
},
    { timestamps: true }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
