const validUrl = require('valid-url');
const dbController = require('./dbController.js');
const hasher = require('./hasher.js');

const shortener = async (url) => {
    if(validUrl.isUri(url) === undefined) {// check if the url is valid
        console.log("not valid");
        return Promise.resolve({"error": "Wrong url format"});
    }
    let shortened = await dbController.shortened(url);  // check if the same url is already shortened
    if(shortened !== false)
        return Promise.resolve(shortened);
    console.log("shortened:", shortened);
    let shortenedUrl = hasher(url);     // if url is valid and not exist in DB, create new hash and update DB
    let result = {"original_url": url, "short_url": shortenedUrl};
    console.log("new url:", result);
    await dbController.updateDB(result);
    return Promise.resolve(result);
}

module.exports = shortener
