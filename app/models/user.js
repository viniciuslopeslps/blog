var bcrypt = require("bcrypt");


module.exports = function (sequelize, DataTypes) {
    
    //CRIA O MODELO [USER] USADO NO SEQUELIZE
    return sequelize.define("user", {
        "email": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "unique": true,
            "validate": {
                "isEmail": true
            }
        },
        "salt":{
			"type": DataTypes.STRING
		},
		"password_hash": {
			"type": DataTypes.STRING
		},
        "password": {
            "type": DataTypes.STRING,
            "allowNull": false,
            set: function(value){
                var salt = bcrypt.genSaltSync(10);
                var hashPassword = bcrypt.hashSync(value, salt);

                this.setDataValue("password", value);
                this.setDataValue("salt", salt);
                this.setDataValue("password_hash", hashPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate: function(user, options){
                if( typeof user.email === 'string'){
                    user.email = user.email.toLowerCase();
                }
            }
        }
    });
};