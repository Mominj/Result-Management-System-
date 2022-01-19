const api = require("../api/index");

module.exports = function(app) {
    app.use("/", api);
}