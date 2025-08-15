const express = require('express');
const route = express.Router();
const { getRegisterController } = require('../controllers/auth.controller')

route.get('/register', getRegisterController)

module.exports = route;