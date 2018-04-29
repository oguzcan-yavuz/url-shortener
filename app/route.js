const express = require('express');
const shortener = require('./shortener.js');
const redirector = require('./redirector.js');
var router = express.Router();

// TODO: add db disconnect functionality when client disconnects
// TODO: ?v= gibi url'de parametre barindiran url'leri almiyor.
// TODO: yeni bir link yaratildiginda sonuclari gosterirken _id nerden geliyor amk?
// TODO: drop the collection when everything is ready and re-create it

// main page router
router.get('/', (req, res) => {
    res.render('index');
});

// router for redirecting short urls to their original urls
router.get('/:shortLink', async (req, res) => {
    let websiteUrl = req.protocol + '://' + req.get('host') + "/";
    let shortLink = websiteUrl + req.params.shortLink;
    let originalLink = await redirector(shortLink);
    if(originalLink !== null)
        res.redirect(originalLink[0]["original_url"]);
    else
        res.json({"error": "This url is not on the database"});
});

// router for creating short urls
router.get('/new/:originalLink(*)', async (req, res) => {
    let websiteUrl = req.protocol + '://' + req.get('host') + "/";
    let originalLink = req.params.originalLink;
    let results = await shortener(originalLink, websiteUrl);
    console.log(results);
    res.json(results);
});

module.exports = router;
