const mongoose = require("mongoose");

const productBrandSchema = mongoose.Schema({
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

const productBrand = mongoose.model("ProductBrand", productBrandSchema);

module.exports = productBrand;
