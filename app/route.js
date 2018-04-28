const express = require('express');
const shortener = require('./shortener.js');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/new/:link', async (req, res) => {
    let link = req.params.link;
    let results = await shortener(link);
    res.json(results);
});

module.exports = router;
