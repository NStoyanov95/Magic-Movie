const util = require('util');
const jsonWebToken = require('jsonwebtoken');

const jwt = {
    sign: util.promisify(jsonWebToken.sign),
    verify: util.promisify(jsonWebToken.verify)
}


module.exports = jwt;