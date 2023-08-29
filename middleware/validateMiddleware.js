const mongoose = require("mongoose");

exports.isValidObjectId = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.customerid)) {
        return res.status(400).json({
            success: false,
            message: 'Geçersiz kimlik id.'
        });
    }
    return next();
}