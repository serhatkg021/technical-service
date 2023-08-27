const mongoose = require("mongoose");

const productServiceSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer",
    },
    comment: {
        type: String,
        required: true,
    },
    serviceStatusId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "ServiceStatus",
    },
},
    { timestamps: true }
);

const productService = mongoose.model("ProductService", productServiceSchema);

module.exports = productService;
