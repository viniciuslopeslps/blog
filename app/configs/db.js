var Sequelize = require("sequelize"); //orm para nodejs
var env = process.env.NODE_ENV || "dev";
var sequelize;

if(env !== "dev"){
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
    sequelize = new Sequelize(undefined, undefined, undefined, {
        "dialect": "sqlite",
        "storage": __dirname + "/../../data/dev-blog.sqlite"
    });
}

var db = {};

db.post = sequelize.import(__dirname + "/../models/post.js"); //aponta para o modulo
db.user = sequelize.import(__dirname + "/../models/user.js");
db.sequelize = sequelize;

//faz os relacionamentos usando seguindo o sequelize
db.post.belongsTo(db.user);
db.user.hasMany(db.post);

module.exports = db;