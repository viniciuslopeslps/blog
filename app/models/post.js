module.exports = function (sequelize, DataTypes) {
    
    //CRIA O MODELO [POST] USADO NO SEQUELIZE
    return sequelize.define("post", {
        "smallTitle": {
            "type": DataTypes.STRING,
            "allowNull": false,
        },
        "bigTitle": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "about": {
            "type": DataTypes.STRING,
            "allowNull": false
        },
        "fullText": {
            "type": DataTypes.STRING,
            "allowNull": false
        }
    }, {
        "hooks": {

       }
    });
};