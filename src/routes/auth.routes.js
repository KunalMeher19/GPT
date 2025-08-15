const express = require('express');
const router = express.Router();
const { getRegisterController, postRegisterController, getLoginController, postLoginController } = require('../controllers/auth.controller')

router.route('/register')
    .get(getRegisterController)
    .post(postRegisterController)

router.route("/login")
    .get(getLoginController)
    .post(postLoginController)

module.exports = router;