const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

const productTypeController = require('../controllers/productTypeController');
const productTypeMiddleware = require('../middleware/productTypeMiddleware');

const productTypeRoute = express.Router();

productTypeRoute.route('/').post(authMiddleware.verifyToken, productTypeController.createNewProductType);

productTypeRoute.route('/').get(authMiddleware.verifyToken, productTypeController.getAllProductTypes);

productTypeRoute.route('/:id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productTypeMiddleware.getProductTypeCheck,
    productTypeController.getProductTypeById
);

productTypeRoute.route('/:id').put(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productTypeMiddleware.getProductTypeCheck,
    productTypeController.updateProductTypeById
);

productTypeRoute.route('/:id').delete(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productTypeMiddleware.getProductTypeCheck,
    productTypeController.deleteProductTypeById
);

module.exports = productTypeRoute;
