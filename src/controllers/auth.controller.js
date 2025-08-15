const userModel = require('../models/auth.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

async function getRegisterController(req, res) {
    res.render("register")
}

async function postRegisterController(req, res) {
    const { email, username, password } = req.body;

    const isUser = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })
    if (isUser) {
        return res.status(409).json({
            msg: "User already exists with this username or email"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email: email,
        username: username,
        password: hashedPassword,
    });
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);
    res.cookie('token', token);

    return res.status(201).redirect('/')
}

async function getLoginController(req, res) {
    res.render("login");
}

async function postLoginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { email: email },
            { username: email }
        ]
    })

    if (!user) {
        return res.redirect('/auth/login?error=User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.redirect('/auth/login?error=Invalid Password');
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);
    res.cookie('token', token);

    return res.status(200).redirect('/')
}

async function userLogout(req, res){
    res.clearCookie('token');
    return res.redirect('/auth/login');
}

module.exports = {
    getRegisterController,
    postRegisterController,
    getLoginController,
    postLoginController,
    userLogout
}