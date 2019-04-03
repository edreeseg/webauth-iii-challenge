const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

module.exports = {
    generateToken,
    checkForToken,
    verifyToken
}

function generateToken(user){
    const { password, ...payload } = user;
    const options = { expiresIn: '1d' };
    return jwt.sign(payload, jwtSecret, options);
}

function checkForToken(req, res, next){
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(401).json({ error: 'Please register or sign in.' });
    }
}

function verifyToken(token){
    return jwt.verify(token, jwtSecret);
}