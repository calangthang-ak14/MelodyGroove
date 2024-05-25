
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validToken = asyncHandler( async (req, res, next) => {

    let token;
    let authRequest = req.headers.authorization || req.headers.Authorization;

    if (authRequest && authRequest.startsWith('Bearer')){
        token = authRequest.split(' ')[1];

        if (!token){
            return res.status(400).json({ message: 'User is not authorized or token is missing'});
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.username;
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Token is invalid or has expired' })
        }
    } else {
        return res.status(401).json({ message: 'User is not authorized or token is missing' })
    }

});

module.exports = validToken;