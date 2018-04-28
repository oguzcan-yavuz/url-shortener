const db = require('./db.js');

db.connectDB((err) => {
    if(err) throw err;
    const db = db.getDB();
    const urls = db.collection('urls');
})
