const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

const productController = require('../controllers/productController');

const productMiddleware = require('../middleware/productMiddleware');
const productTypeMiddleware = require('../middleware/productTypeMiddleware');
const productBrandMiddleware = require('../middleware/productBrandMiddleware');

const productRoute = express.Router();

productRoute.route('/').post(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productTypeMiddleware.getProductTypeCheckBody,
    productBrandMiddleware.getProductBrandCheckBody,
    productController.createNewProduct
);

productRoute.route('/').get(authMiddleware.verifyToken, productController.getAllProducts);

productRoute.route('/:product_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productMiddleware.getProductCheck,
    productController.getProductById
);

productRoute.route('/type/:type_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productTypeMiddleware.getProductTypeCheck,
    productController.getAllProductsByTypeId
);

productRoute.route('/brand/:brand_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productBrandMiddleware.getProductBrandCheck,
    productController.getAllProductsByBrandId
);

productRoute.route('/type_and_brand/:type_id/:brand_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productTypeMiddleware.getProductTypeCheck,
    productBrandMiddleware.getProductBrandCheck,
    productController.getAllProductsByTypeAndBrandId
);

productRoute.route('/:product_id').put(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productMiddleware.getProductCheck,
    productController.updateProductById
);

productRoute.route('/:product_id').delete(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productMiddleware.getProductCheck,
    productController.deleteProductById
);

module.exports = productRoute;
