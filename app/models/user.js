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
        "password": {
            "type": DataTypes.STRING,
            "allowNull": false
        }
    }, {
            "hooks": {
                //é possível executar funcoes antes e depois de inserir um dado
                //estamos colocando um email para lowercase
                "beforeCreate": function (user, options) {
                    if (typeof user.email === 'string') {
                        user.email = user.email.trim();
                    }
                }
            }
        });
};