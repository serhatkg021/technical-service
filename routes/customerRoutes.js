const express = require('express');
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
// const { check, validationResult } = require("express-validator");
const customerMiddleware = require('../middleware/customerMiddleware');

const customerRoute = express.Router();

customerRoute.route('/').post(authMiddleware.verifyToken, customerController.createNewCustomer);

customerRoute.route('/').get(authMiddleware.verifyToken, customerController.getAllCustomers);

customerRoute.route('/:customerid').get(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    customerMiddleware.getCustomerCheck,
    customerController.getCustomerById
);

customerRoute.route('/:customerid').put(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    customerMiddleware.getCustomerCheck,
    customerController.updateCustomerById
);

customerRoute.route('/:customerid').delete(
    authMiddleware.verifyToken,
    validateMiddleware.isValidObjectId,
    customerMiddleware.getCustomerCheck,
    customerController.deleteCustomerById
);

module.exports = customerRoute;
