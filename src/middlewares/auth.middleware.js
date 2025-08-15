const userModel = require('../models/auth.models');
const jwt = require('jsonwebtoken');

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/auth/login')
    }

    try {
        const decoded = await jwt.decode(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();
    }
    catch (err) {
        res.status(401).redirect('/auth/login');
    }
}

module.exports = { authUser };

