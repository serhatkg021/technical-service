const ProductModel = require('../models/Product');

exports.getAllProducts = async () => {
    return await ProductModel.find();
}

exports.createProduct = async (product) => {
    return await ProductModel.create(product);
}

exports.getProductById = async (id) => {
    return await ProductModel.findById(id);
}

exports.getAllProductsByTypeId = async (typeId) => {
    return await ProductModel.find({ typeId: typeId });
}

exports.getAllProductsByBrandId = async (brandId) => {
    return await ProductModel.find({ brandId: brandId });
}

exports.getAllProductsByTypeAndBrandId = async (typeId, brandId) => {
    return await ProductModel.find({ $and: [{ typeId: typeId }, { brandId: brandId }] });
}

exports.getProductByName = async (productName) => {
    return await ProductModel.findOne({ name: productName }).exec();
}

exports.updateProductById = async (id, product) => {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true });
}

exports.deleteProductById = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
}