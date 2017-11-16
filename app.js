var PORT = process.env.PORT || 3000;
var app = require("./app/configs/config").configure();
var db = require("./app/configs/db.js");

db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log('Server is running!');
	});
});