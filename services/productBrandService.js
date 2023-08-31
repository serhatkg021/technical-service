const ProductBrandModel = require('../models/ProductBrand');

exports.getAllProductBrands = async () => {
    return await ProductBrandModel.find();
}

exports.createProductBrand = async (productBrand) => {
    return await ProductBrandModel.create(productBrand);
}

exports.getProductBrandById = async (id) => {
    return await ProductBrandModel.findById(id);
}

exports.getProductBrandByName = async (productBrandName) => {
    return await ProductBrandModel.findOne({ name: productBrandName }).exec();
}

exports.updateProductBrandById = async (id, productBrand) => {
    return await ProductBrandModel.findByIdAndUpdate(id, productBrand, { new: true });
}

exports.deleteProductBrandById = async (id) => {
    return await ProductBrandModel.findByIdAndDelete(id);
}