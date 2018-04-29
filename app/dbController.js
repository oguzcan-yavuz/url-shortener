const db = require('./db.js');
let dbObj;

console.log('dbController.js');

// create an instance of database at start
db.connectDB((err) => {
    if(err) throw err;
    dbObj = db.getDBObj();
    console.log("connection called from db controller");
});

function insertShortLink(result) {
    // inserts new original-short link pair to the database
    let urls = dbObj.collection('urls');
    // insert changes result, make a copy of it and insert that instead
    let copyResult = Object.assign({}, result);
    urls.insert(copyResult, (err, data) => {
        if(err) throw err;
    })
}

function shortened(url) {
    return new Promise(resolve => {
        let query = { "original_url": url };
        let projection = { _id: false, "original_url": true, "short_url": true };
        let cursor = dbObj.collection('urls').find(query).project(projection);
        cursor.toArray((err, documents) => {
            if(documents !== null && documents.length > 0)
                resolve(documents[0]);
            else
                resolve(false);
        });
    });
}

function getOriginalLink(shortLink) {
    return new Promise(resolve => {
        let query = { "short_url": shortLink };
        let projection = { _id: false, "original_url": true };
        let cursor = dbObj.collection('urls').find(query).project(projection);
        cursor.toArray((err, documents) => {
            resolve(documents);
        });
    });
}

module.exports = { insertShortLink, shortened, getOriginalLink }
