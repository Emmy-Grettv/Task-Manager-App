const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

//User Id to generate token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "90d"})
}

module.exports = generateToken;