const customerService = require('../services/customerService');

exports.getCustomerCheck = async (req, res, next) => {
    const getCustomer = await customerService.getCustomerById(req.params.customer_id);
    if (!getCustomer) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir müşteri kayıtlı değil.'
        });
    }
    return next();
}

exports.getCustomerCheckBody = async (req, res, next) => {
    const getCustomer = await customerService.getCustomerById(req.body.customerId);
    if (!getCustomer) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir müşteri kayıtlı değil.'
        });
    }
    return next();
}
