const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/new/:link', (req, res) => {
    let link = req.params.link;
    res.send(link);
});

module.exports = router;
