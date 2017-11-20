var db = require("../configs/db.js");
var bcrypt = require('bcrypt');
var cryptjs = require("crypto-js");
var jwt = require("jsonwebtoken");
var _ = require("underscore");

function createUser(body) {
    return db.user.create(body).then((user) => {
        return user;
    }); 
}

function findByEmail(userEmail) {
    return db.user.findOne({
        where: {
            email: userEmail
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
        var stringData = JSON.stringify({ id: user.id,email: user.email, type: type });
        var encryptedData = cryptjs.AES.encrypt(stringData, 'secret').toString();
        var token = jwt.sign({
            token:encryptedData
        }, 'secret');
        return token;
    } catch (e) {
        return undefined;
    }
}

function findByToken(token) {
    return new Promise(function (resolve, reject) {
        if (!token) {
            return reject();
        }
        var decodedJWT = jwt.verify(token, 'secret');
        var bytes = cryptjs.AES.decrypt(decodedJWT.token, 'secret');
        var tokenData = JSON.parse(bytes.toString(cryptjs.enc.Utf8));

        return findByEmail(tokenData.email)
            .then((user) => {
                if (!user) {
                    return reject();
                }
                return resolve(user.dataValues);
            }).catch(e => reject(e));
    });
}


module.exports = {
    createUser: createUser,
    findByEmail: findByEmail,
    comparePasswords: comparePasswords,
    generateToken: generateToken,
    findByToken: findByToken
};