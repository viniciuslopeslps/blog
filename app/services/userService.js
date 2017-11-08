var db = require("../configs/db.js");
var sequelize = require("sequelize");

function createUser(body) {
    return db.user.create(body).then((user) => {
        return user;
    });
}

module.exports = {
    createUser: createUser
};