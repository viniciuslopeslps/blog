module.exports = function (sequelize, DataTypes) {
    
    //CRIA O MODELO [USER] USADO NO SEQUELIZE
    return sequelize.define("user", {
        "username": {
            "type": DataTypes.STRING,
            "allowNull": false,
            "unique": true,
            "validate": {
                "isEmail": true
            }
        },
        "password": {
            "type": DataTypes.STRING,
            "allowNull": false
        }
    }, {
        "hooks": {

        }
    });
};