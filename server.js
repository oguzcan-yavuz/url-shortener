require('dotenv').config();
const express = require('express');
const router = require('./app/route.js');
const path = require('path');
const PORT = process.env.PORT || 8427;
var app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(router);
app.listen(PORT, () => {
    console.log("Server is listening on " + PORT);
})
