const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Creating Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoutes = require('./routes/indexRoutes');
const listRoutes = require('./routes/listRoutes');
const productsRoutes = require('./routes/productsRoutes');

app.use('/', indexRoutes);
app.use('/list', listRoutes);
app.use('/products', productsRoutes);

module.exports = app;
