const UserModel = require('../models/User');

exports.getAllUsers = async () => {
    return await UserModel.find();
}

exports.createUser = async (user) => {
    return await UserModel.create(user);
}

exports.getUserById = async (id) => {
    return await UserModel.findById(id).select('-password');
}

exports.getUserByEmail = async (userEmail) => {
    return await UserModel.findOne({ email: userEmail }).exec();
}

exports.getUserByPhone = async (userPhone) => {
    return await UserModel.findOne({ phone: userPhone }).exec();
}

exports.updateUserById = async (id, user) => {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
}

exports.deleteUserById = async (id) => {
    return await UserModel.findByIdAndDelete(id);
}