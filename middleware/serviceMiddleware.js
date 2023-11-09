const serviceService = require('../services/serviceService');

exports.getServiceCheck = async (req, res, next) => {
    const getService = await serviceService.getServiceById(req.params.service_id);
    if (!getService) {
        return res.status(200).json({
            success: false,
            message: 'Böyle bir servis kayıtlı değil.'
        });
    }
    return next();
}