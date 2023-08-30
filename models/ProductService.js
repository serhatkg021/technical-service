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

const productService = mongoose.model("ProductService", productServiceSchema);

module.exports = productService;
