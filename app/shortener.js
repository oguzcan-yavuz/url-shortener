const validUrl = require('valid-url');
const db = require('./db.js');
const hasher = require('./hasher.js');

const shortener = async (url) => {
    if(validUrl.isUri(url))
        return Promise.resolve({"error": "Wrong url format."});
    let shortenedUrl = hasher(url);
    let result = {"original_url": url, "short_url": shortenedUrl};
    await updateDB(result);
    return Promise.resolve(result);
}

function updateDB(result) {
    db.connectDB((err) => {
        if(err) throw err;
        const db = db.getDB();
        const urls = db.collection('urls');
        urls.insert(result, (err, data) => {
            if(err) throw err;
            console.log("Inserted!");
            db.disconnectDB();
        })
    })
}

module.exports = shortener
