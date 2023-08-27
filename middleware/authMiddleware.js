const jwt = require("jsonwebtoken");
const userService = require('../services/userService');

exports.verifyToken = async (req, res, next) => {
    const userToken = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!userToken) {
        return res.status(403).json({
            "success": false,
            "message": "Kimlik doğrulama için bir token gerekli"
        });
    }
    try {
        const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET);
        req.user = await userService.getUserById(verifyToken.payload.id);
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            "success": false,
            "message": "Token Geçersiz"
        });
    }
    return next();
};
