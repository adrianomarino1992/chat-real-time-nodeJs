let Utilidades = require('../Models/Utilidades/Utilizadades');
let Util = new Utilidades();

exports.Start = (Application, _path) => {

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



    Application.App.get('/console', (req, res) => {


        if (Application.Socket.length > 0) {


            for (let cliente of Application.Socket) {

                cliente.emit('close', {

                    exec: `window.close();`

                });

            }
        }

        res.end();
    })



}