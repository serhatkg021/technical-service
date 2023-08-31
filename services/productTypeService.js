const ProductTypeModel = require('../models/ProductType');

exports.getAllProductTypes = async () => {
    return await ProductTypeModel.find();
}

exports.createProductType = async (productType) => {
    return await ProductTypeModel.create(productType);
}

exports.getProductTypeById = async (id) => {
    return await ProductTypeModel.findById(id);
}

exports.getProductTypeByName = async (productTypeName) => {
    return await ProductTypeModel.findOne({ name: productTypeName }).exec();
}

exports.updateProductTypeById = async (id, productType) => {
    return await ProductTypeModel.findByIdAndUpdate(id, productType, { new: true });
}

exports.deleteProductTypeById = async (id) => {
    return await ProductTypeModel.findByIdAndDelete(id);
}