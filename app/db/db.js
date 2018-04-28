const mongo = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

console.log(MONGODB_URI);

mongo.connect(MONGODB_URI, (err, db) => {
    if(err) throw err;
    let dbObj = db.db(DB_NAME);
    let docs = dbObj.collection('urls', (err, data) => {
        if(err) throw err;
        console.log("we have a collection and we can access to the mLab db");
    });
});
