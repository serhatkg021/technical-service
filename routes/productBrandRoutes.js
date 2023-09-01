const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

const productBrandController = require('../controllers/productBrandController');
const productBrandMiddleware = require('../middleware/productBrandMiddleware');

const productBrandRoute = express.Router();

productBrandRoute.route('/').post(authMiddleware.verifyToken, productBrandController.createNewProductBrand);

productBrandRoute.route('/').get(authMiddleware.verifyToken, productBrandController.getAllProductBrands);

productBrandRoute.route('/:brand_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productBrandMiddleware.getProductBrandCheck,
    productBrandController.getProductBrandById
);

productBrandRoute.route('/:brand_id').put(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productBrandMiddleware.getProductBrandCheck,
    productBrandController.updateProductBrandById
);

productBrandRoute.route('/:brand_id').delete(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productBrandMiddleware.getProductBrandCheck,
    productBrandController.deleteProductBrandById
);

module.exports = productBrandRoute;
