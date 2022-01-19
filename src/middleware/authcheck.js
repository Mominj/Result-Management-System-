const jwt = require('jsonwebtoken');
const config = require('../config/config')

const requireAuth =  (req,res,next) => {

    const token = req.headers.authorization.split(' ')[1];
    if(token){
        jwt.verify(token, config.jwt.accessTokenSecret, (err, decodedtoken) => {
            if(err) {
               res.status(401).send({ message: err.message || "auth error"}); 
            }else {
                next();
            }
        })
    }else {
        res.status(401).send({ message: "auth error"}); 
    }
}
module.exports = requireAuth;





