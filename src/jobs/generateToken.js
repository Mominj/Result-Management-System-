const jwt = require('jsonwebtoken')
const config = require('../config/config')
const maxaage = 3*24*60*60

const createToken = (email)=> {
  return jwt.sign({email}, config.jwt.accessTokenSecret, {
    expiresIn: maxaage
  });
}

module.exports = createToken