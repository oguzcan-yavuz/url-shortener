const mongo = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

let _db;
let _dbObj;

const connectDB = (callback) => {
    try {
        mongo.connect(MONGODB_URI, (err, db) => {
            _db = db;
            _dbObj = db.db(DB_NAME);
            return callback(err);
        })
    } catch(e) {
        throw e;
    }
}

const getDBObj = () => _dbObj;

const disconnectDB = () => { _db.close(); }

module.exports = { connectDB, getDBObj, disconnectDB };
