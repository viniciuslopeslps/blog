var db = require("../configs/db.js");
var bcrypt = require('bcrypt');
var cryptjs = require("crypto-js");
var jwt = require("jsonwebtoken");
var _ = require("underscore");

function createUser(body) {
    return db.user.create(body).then((user) => {
        console.log(user);
        return user;
    }); ''
}

function findByEmail(email) {
    return db.user.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        return user;
    }).catch(e => console.log(e));
}

function comparePasswords(inputPassword, user) {
    return bcrypt.compareSync(inputPassword, user.password_hash);
}

function generateToken(type, user) {
    if (!_.isString(type)) {
        return undefined;
    }
    try {
        var stringData = JSON.stringify({ id: user.id, type: type });
        var encryptedData = cryptjs.AES.encrypt(stringData, 'secret').toString();
        var token = jwt.sign({
            token:encryptedData
        }, 'secret');
        return token;
    } catch (e) {
        return undefined;
    }
}

module.exports = {
    createUser: createUser,
    findByEmail: findByEmail,
    comparePasswords: comparePasswords,
    generateToken: generateToken
};