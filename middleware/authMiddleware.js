const jwt = require("jsonwebtoken");
const userService = require('../services/userService');

exports.verifyToken = async (req, res, next) => {
    const userToken = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!userToken) {
        return res.status(403).json({
            "success": false,
            "message": "Kimlik doğrulama için bir token gerekli."
        });
    }
    try {
        const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET);
        const reqUser = await userService.getUserById(verifyToken.payload.id);
        if (!reqUser) {
            return res.status(401).json({
                "success": false,
                "message": "Yetkisiz işlem!"
            });
        }
        req.user = reqUser;
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            "success": false,
            "message": "Token geçersiz."
        });
    }
    return next();
};
