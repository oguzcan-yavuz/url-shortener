const sha1 = require('sha1');

function hasher(originalUrl) {
    // returns just the first 6 chars of sha-1 hash of given url
    return sha1(decodeURIComponent(originalUrl)).substring(0, 6);
}

module.exports = hasher;
