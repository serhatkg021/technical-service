const jwt = require('jsonwebtoken');

exports.createToken = (payload) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
};