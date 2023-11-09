const ServiceModel = require('../models/Service');

exports.getAllServices = async () => {
    return await ServiceModel.find().populate('productId customerId');
}

exports.createService = async (service) => {
    return await ServiceModel.create(service).populate('productId customerId');
}

exports.getServiceById = async (id) => {
    return await ServiceModel.findById(id);
}

exports.getAllServicesByProductId = async (productId) => {
    return await ServiceModel.find({ productId: productId });
}

exports.getAllServicesByCustomerId = async (customerId) => {
    return await ServiceModel.find({ customerId: customerId });
}

exports.getAllServicesByProductAndCustomerId = async (productId, customerId) => {
    return await ServiceModel.find({ $and: [{ productId: productId }, { customerId: customerId }] });
}

exports.getServiceByServiceCode = async (serviceCode) => {
    return await ServiceModel.findOne({ serviceCode: serviceCode }).exec();
}

exports.updateServiceById = async (id, service) => {
    return await ServiceModel.findByIdAndUpdate(id, service, { new: true });
}

exports.deleteServiceById = async (id) => {
    return await ServiceModel.findByIdAndDelete(id);
}