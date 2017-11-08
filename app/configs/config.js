var express = require("express");
var routes = require("../controllers/routes")
var bodyParser = require("body-parser");

function configureApp(){
    var app = express();
    
    //configurando o ejs
    app.set('view engine', 'ejs');
    
    //diz onde está os arquivos de views
    app.set('views', './app/views');

    //config para arquivos estaticos
    app.use('/public', express.static(__dirname + '/public'));
    
    //body parser é um middleware a nivel de aplicacao, ou seja, vai interceptar todas as requisiçoes e pegar os seus jsons
    app.use(bodyParser.json());
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    routes(app);
    return app;
};

module.exports = {
    configure: configureApp
};