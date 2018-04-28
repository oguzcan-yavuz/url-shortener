require('dotenv').config();
const express = require('express');
const router = require('./app/router/route.js');
const path = require('path');
const PORT = process.env.PORT || 8427;
const db = require('./app/db/db.js');       // TODO: we aren't exporting anything yet, also we might need to use this in routes.
var app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(router);
app.listen(PORT, () => {
    console.log("Server is listening on " + PORT);
})
