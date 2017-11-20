var assert = require('assert');
var moment = require("moment");
var userService = require("../../app/services/userService.js");

var body ={
    email: "user@test.com",
    password: "secret"
}

describe('user service class', () => {

    describe('findByEmailTest', () => {
        it('should find the new user', function () {

            userService.createUser(body).then(created => {

                userService.findByEmail(created.email).then(user => {
                    assert.equal(user.email, 'user@test.com');
                    assert.equal(user.password, 'secret');
    
                    userService.deleteUser(user.id);                
                });
                
            });
        })
    });
});