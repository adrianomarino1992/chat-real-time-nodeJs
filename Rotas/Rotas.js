let Utilidades = require('../Models/Utilidades/Utilizadades');
let Util = new Utilidades();


var url = require('url');

var bodyParser = require('body-parser');


exports.Start = (Application, _path) => {

    //UTILIZANDO BODYPARSE, PARA USAR JSON !!!!
    Application.App.use(bodyParser.urlencoded({ extended: true }));
    Application.App.use(bodyParser.json({ limit: '50mb' })); // tamanho do body vindo da request 

        
    
    Application.App.get('/', (req, res) => {
        res.sendFile(_path + "/Public/" + "index.html");
    })

    Application.App.get('/style.css', function (req, res) {
        res.sendFile(_path + "/Public/Css/" + "style.css");
    });

    Application.App.get('/socket.io.js', function (req, res) {
        res.sendFile(_path + "/Public/" + "socket.io.js");
    });

    Application.App.get('/script.js', function (req, res) {
        res.sendFile(_path + "/Public/Js/" + "script.js");
    });

    Application.App.get('/jquery.js', function (req, res) {
        res.sendFile(_path + "/Public/jquery/" + "jquery3.4.1.js");
    });
    Application.App.get('/logo.png', function (req, res) {
        res.sendFile(_path + "/Public/Img/" + "logo.png");
    });

    Application.App.get('/cardapio.png', function (req, res) {
        res.sendFile(_path + "/Public/Img/" + "cardapio.png");
    });

      
}