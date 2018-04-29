const express = require('express');
const shortener = require('./shortener.js');
const redirector = require('./redirector.js');
var router = express.Router();

// main page router
router.get('/', (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('index', { url: fullUrl });
});

// router for redirecting short urls to their original urls
router.get('/:shortLink/', async (req, res) => {
    let websiteUrl = req.protocol + '://' + req.get('host') + "/";
    let shortLink = websiteUrl + req.params.shortLink;
    let originalLink = await redirector(shortLink);
    if(originalLink !== null && originalLink.length > 0)
        res.redirect(originalLink[0]["original_url"]);
    else
        res.json({"error": "This url is not on the database"});
});

// router for creating short urls
router.get('/new/*', async (req, res) => {
    let websiteUrl = req.protocol + '://' + req.get('host') + "/";
    let originalLink = req.originalUrl.substring(5);    // part that matches with *
    let results = await shortener(originalLink, websiteUrl);
    res.json(results);
});

module.exports = router;
