const mongoose = require("mongoose");

const productBrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

const productBrand = mongoose.model("ProductBrand", productBrandSchema);

module.exports = productBrand;
