const ProductModel = require('../models/Product');

exports.getAllProducts = async () => {
    return await ProductModel.find().populate('typeId brandId');
}

exports.createProduct = async (product) => {
    return await ProductModel.create(product);
}

exports.getProductById = async (id) => {
    return await ProductModel.findById(id).populate('typeId brandId');
}

exports.getAllProductsByTypeId = async (typeId) => {
    return await ProductModel.find({ typeId: typeId }).populate('typeId brandId');
}

exports.getAllProductsByBrandId = async (brandId) => {
    return await ProductModel.find({ brandId: brandId }).populate('typeId brandId');
}

exports.getAllProductsByTypeAndBrandId = async (typeId, brandId) => {
    return await ProductModel.find({ $and: [{ typeId: typeId }, { brandId: brandId }] }).populate('typeId brandId');
}

exports.getProductByName = async (productName) => {
    return await ProductModel.findOne({ name: productName }).populate('typeId brandId').exec();
}

exports.updateProductById = async (id, product) => {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true });
}

exports.deleteProductById = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
}