const productService = require('../services/productService');

exports.getProductCheck = async (req, res, next) => {
    const getProduct = await productService.getProductById(req.params.product_id);
    if (!getProduct) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir ürün kayıtlı değil.'
        });
    }
    return next();
}