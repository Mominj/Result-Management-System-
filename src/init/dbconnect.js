const config = require('../config/config')
const mongoose = require("mongoose");

var connectionString = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//connection check
mongoose.connection
	.once("open", function() {
		console.log("Databse connection Successfully.");
	})
	.on("error", function(error) {
		console.log("Connection Error: ", error);
	});