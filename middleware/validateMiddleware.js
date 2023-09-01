const mongoose = require("mongoose");

exports.isValidObjectId = async (req, res, next) => {
    for (const property in req.params) {
        if (property.split("_")[1] == 'id') {
            if (!mongoose.isValidObjectId(req.params[property])) {
                return res.status(400).json({
                    success: false,
                    message: 'Geçersiz kimlik id.'
                });
            }
        }
    }
    return next();
}