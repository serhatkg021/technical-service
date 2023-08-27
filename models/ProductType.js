const mongoose = require("mongoose");

const productTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

const productType = mongoose.model("ProductType", productTypeSchema);

module.exports = productType;
