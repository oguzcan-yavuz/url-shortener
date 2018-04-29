const dbController = require('./dbController.js');

const redirector = async (shortLink) => {
    let originalLink = await dbController.getOriginalLink(shortLink);
    return Promise.resolve(originalLink);
}

module.exports = redirector;
