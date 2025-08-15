const express = require('express');
const route = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')

route.get('/', authMiddleware.authUser, (req, res) => {
    res.render("home");
})

module.exports = route;