const express = require('express');
const app = express();
const indexRoute = require('./routes/index.route')
const authRoute = require('./routes/auth.routes')

app.set("view engine", "ejs");
app.use(express.static('public')) //serve static files from the public file using express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/auth',authRoute);

module.exports = app;