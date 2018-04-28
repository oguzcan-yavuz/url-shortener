const mongo = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

let _dbObj;

const connectDB = (callback) => {
    try {
        mongo.connect(MONGODB_URI, (err, db) => {
            let dbObj = db.db(DB_NAME);
            _dbObj = dbObj;
            return callback(err);
        })
    } catch(e) {
        throw e;
    }
}

const getDB = () => _dbObj;

const disconnectDB = () => _dbObj.close();

module.exports = { connectDB, getDB, disconnectDB };
