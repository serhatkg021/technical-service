const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const userRoute = express.Router();

userRoute.route('/register').post(userController.singUpUser);
userRoute.route('/login').post(userController.loginUser);

userRoute.route('/').get(authMiddleware.verifyToken, userController.getAllUsers);

module.exports = userRoute;
