require('dotenv').config()
const express = require('express');
const indexRoute = require('./routes/index.route')
const authRoute = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express();

app.set("view engine", "ejs");
app.use(express.static('public')) //serve static files from the public file using express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/', indexRoute);
app.use('/auth',authRoute);

module.exports = app;