require('dotenv').config();
const express = require('express');
const router = require('./app/router/route.js');
const PORT = process.env.PORT || 8427;
var app = express();

app.use(router);
app.listen(PORT, () => {
    console.log("Server is listening on " + PORT);
})
