const productTypeService = require('../services/productTypeService');

exports.getProductTypeCheck = async (req, res, next) => {
    const getProductType = await productTypeService.getProductTypeById(req.params.type_id);
    if (!getProductType) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir ürün türü kayıtlı değil.'
        });
    }
    return next();
}

exports.getProductTypeCheckBody = async (req, res, next) => {
    const getProductType = await productTypeService.getProductTypeById(req.body.typeId);
    if (!getProductType) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir ürün türü kayıtlı değil.'
        });
    }
    return next();
}