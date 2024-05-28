const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const indexRoutes = require('./routes/indexRoutes');
const listRoutes = require('./routes/listRoutes');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

// Creating Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoutes);
app.use('/list', listRoutes);
app.use('/products', productsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
