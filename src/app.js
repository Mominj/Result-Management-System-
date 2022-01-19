const express = require("express");
const app = express();
require('dotenv').config()
const expressLayouts = require('express-ejs-layouts');
const config = require('./config/config')

require('./init/dbconnect');
require('./init/modules')(app); 
require('./init/cors')(app);


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(__dirname + 'public'))

 require('./init/routes')(app);
// require('./init/errorHandling')(app);
const port = config.server.port || 3001;
app.listen(port, () => {
    console.log(`Run succesfully at ${port}`)
})
