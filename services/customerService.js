const CustomerModel = require('../models/Customer');

exports.getAllCustomers = async () => {
    return await CustomerModel.find();
}

exports.createCustomer = async (customer) => {
    return await CustomerModel.create(customer);
}

exports.getCustomerById = async (id) => {
    return await CustomerModel.findById(id);
}

exports.getCustomerByEmail = async (customerEmail) => {
    return await CustomerModel.findOne({ email: customerEmail }).exec();
}

exports.getCustomerByPhone = async (customerPhone) => {
    return await CustomerModel.findOne({ phone: customerPhone }).exec();
}

exports.updateCustomerById = async (id, customer) => {
    return await CustomerModel.findByIdAndUpdate(id, customer, { new: true });
}

exports.deleteCustomerById = async (id) => {
    return await CustomerModel.findByIdAndDelete(id);
}