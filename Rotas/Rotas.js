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


    /* 
    API TEMPORARIA 
    */


    var Transporter =
        [

        ]

    

    Responses = [];

    app.post('/request/api/v1', (request, response) => {

        var body = request.body;

        body["id"] = new Date().getTime();

        var go = true;

        for (let f of Transporter) {
            if (f.terminal == body.terminal) {
                response.json([]);
                go = false;
            }
        }

        if (go) {

            Transporter.push(body);

            setTimeout(() => {
                var answered = false;
                var aux = [];

                for (var req of Responses) {

                    if (req.terminal == body.terminal) {
                        response.json(req);
                        answered = true;
                    } else {
                        aux.push(req);
                    }
                }

                let tAux = [];
                for (let p of Transporter) {
                    if (p.terminal != body.terminal) {
                        tAux.push(p)
                    }
                }

                if (!answered) {
                    response.json([]);
                }

                Transporter = tAux;

                Responses = aux;

            }, 5000);


        } else {
            response.end();
        }

    })

    app.post('/watcher/api/v1', (request, response) => {

        let terminal = request.body.ID;

        let resp = null;

        let temp = [];

        for (let r of Transporter) {

            if (r.terminal == terminal) {
                resp = r;
            } else {
                temp.push(r);
            }
        }

        console.log("monitorando : " + terminal);

        Transporter = temp;

        response.json(resp);

    })


    app.post('/resp/api/v1', (request, response) => {

        var parsedUrl = url.parse(request.url, true);

        var query = parsedUrl.query;

        let id = query.id;

        let body = request.body;

        Responses.push({
            terminal: body.OriginID,
            Rows: body.Rows
        })

        response.end();


    })




    app.post('/licence/result', (request, response) => {

        var parsedUrl = url.parse(request.url, true);

        var query = parsedUrl.query;

        let id = query.id;

        /*
        
        <LOGICA VALIDAÇÃO DE LICENÇA>
        
        */

        response.json({
            limit: '2020-10-10',
            status: 'Online'
        });
    })



}