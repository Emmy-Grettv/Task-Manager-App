const crypto = require('node:crypto');

const hashToken = (token) => {
    return crypto.createHash("sha256").update(token.string()).digest("hex");
}

module.exports = hashToken