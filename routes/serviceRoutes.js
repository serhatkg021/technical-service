const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

const serviceController = require('../controllers/serviceController');

const serviceMiddleware = require('../middleware/serviceMiddleware');
const productMiddleware = require('../middleware/productMiddleware');
const customerMiddleware = require('../middleware/customerMiddleware');

const serviceRoute = express.Router();

serviceRoute.route('/').post(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productMiddleware.getProductCheckBody,
    customerMiddleware.getCustomerCheckBody,
    serviceController.createNewService
);

serviceRoute.route('/').get(authMiddleware.verifyToken, serviceController.getAllServices);

serviceRoute.route('/:service_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    serviceMiddleware.getServiceCheck,
    serviceController.getServiceById
);

serviceRoute.route('/product/:product_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productMiddleware.getProductCheck,
    serviceController.getAllServicesByProductId
);

serviceRoute.route('/customer/:customer_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    customerMiddleware.getCustomerCheck,
    serviceController.getAllServicesByCustomerId
);

serviceRoute.route('/product_and_customer/:product_id/:customer_id').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    productMiddleware.getProductCheck,
    customerMiddleware.getCustomerCheck,
    serviceController.getAllServicesByProductAndCustomerId
);

serviceRoute.route('/:service_id').put(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    serviceMiddleware.getServiceCheck,
    serviceController.updateServiceById
);

serviceRoute.route('/:service_id').delete(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    serviceMiddleware.getServiceCheck,
    serviceController.deleteServiceById
);

module.exports = serviceRoute;
