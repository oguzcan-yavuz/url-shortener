const validUrl = require('valid-url');
const dbController = require('./dbController.js');
const hasher = require('./hasher.js');

const shortener = async (originalUrl, websiteUrl) => {
    if(validUrl.isUri(originalUrl) === undefined)   // check if the url is valid
        return Promise.resolve({"error": "Wrong url format"});
    let shortened = await dbController.shortened(originalUrl);  // check if the same url is already shortened
    if(shortened !== false)
        return Promise.resolve(shortened);
    // if url is valid and not exist in DB, create new hash and update DB
    let shortenedUrl = websiteUrl + hasher(originalUrl);
    let result = {"original_url": originalUrl, "short_url": shortenedUrl};
    await dbController.insertShortLink(result);
    return Promise.resolve(result);
}

module.exports = shortener
