const productBrandService = require('../services/productBrandService');

exports.getProductBrandCheck = async (req, res, next) => {
    const getProductBrand = await productBrandService.getProductBrandById(req.params.id);
    if (!getProductBrand) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir ürün markası kayıtlı değil.'
        });
    }
    return next();
}