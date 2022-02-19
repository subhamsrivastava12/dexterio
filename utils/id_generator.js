// const dotenv = require("dotenv");
const bcrypt = require("crypto");
// const jwt = require("jsonwebtoken");
// dotenv.config();


module.exports.generateId=(string)=>{
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256').update(string).digest('hex');
    return hash;
}