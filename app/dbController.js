const db = require('./db.js');
let dbObj;

db.connectDB((err) => {
    if(err) throw err;
    dbObj = db.getDBObj();
});

function updateDB(result) {
    db.connectDB((err) => {
        if(err) throw err;
        let urls = dbObj.collection('urls');
        // Insert the results to the DB
        urls.insert(result, (err, data) => {
            if(err) throw err;
            console.log("Inserted!");
            db.disconnectDB();
        })
    })
}

function shortened(url) {
    return new Promise(resolve => {
        console.log("shortened?");
        let query = { "original_url": url };
        let projection = { _id: false, "original_url": true, "short_url": true };
        let cursor = dbObj.collection('urls').find(query).project(projection);
        cursor.toArray((err, documents) => {
            console.log("documents: ", documents);
            if(documents.length > 0)
                resolve(documents[0]);
            else
                resolve(false);
        })
    })
}

module.exports = { updateDB, shortened }
