import "@babel/polyfill";
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const config = require('../config/config')

module.exports = function(app) {
    //log handle
    // if(config.morgan.enabled) app.use(morgan(config.morgan.format));
    app.use(morgan('tiny'));
    //cookie
    app.use(cookieParser());

    //bodyParser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}