let Utilidades = require('../Models/Utilidades/Utilizadades');
let Util = new Utilidades();
var PG = require('../PgConnection/PG');

//API TESTE
var url = require('url');
var bodyParser = require('body-parser');
const { request } = require('http');
const { response } = require('express');

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



    /*
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

    */


    /* 
    API TEMPORARIA 
    */


    var Transporter =
        [

        ]



    Responses = [];

    Application.App.post('/request/api/v1', (request, response) => {

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
                        if(!answered){
                        response.json(req);
                        }
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
                    setTimeout(() => {
                        var answered = false;
                        var aux = [];
        
                        for (var req of Responses) {
        
                            if (req.terminal == body.terminal) {
                                if(!answered){
                                response.json(req);
                                }
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
        
                    }, 3000);
                }

                Transporter = tAux;

                Responses = aux;

            }, 2000);


        } else {
            response.end();
        }

    })

    Application.App.post('/watcher/api/v1', (request, response) => {

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


    Application.App.post('/resp/api/v1', (request, response) => {

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




    Application.App.post('/licence/result', (request, response) => {

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



    Application.App.post('/forum/save',(request,response)=>{

        var forum = request.body;

        console.log(forum);

        PG.ADDForum(forum.parameters.Post, done =>{
            if(!done){
                response.json({msg : "Falha na conexão", erro : true});
                response.end();
            }else{
                response.json({msg : "Sua sujestão foi adicionada com sucesso na base de dados ", sucess : true});
                response.end();
            }
        });

    })

    Application.App.post('/forum/like',(request,response)=>{

        var forum = request.body;

        console.log(forum.parameters);

        PG.Like(forum.parameters, done =>{
            if(!done){
                response.json({msg : "Falha na conexão", erro : true});
                response.end();
            }else{
                response.json({msg : "Like executado", sucess : true});
                response.end();
            }
        });

    })


    Application.App.post('/forum/denuncia',(request,response)=>{

        var forum = request.body;

        console.log(forum.parameters);

        PG.Denucnia(forum.parameters, done =>{
            if(!done){
                response.json({msg : "Falha na conexão", erro : true});
                response.end();
            }else{
                response.json({msg : "Esta sujestão será analisada por um de nosso representantes.", sucess : true});
                response.end();
            }
        });

    })



    Application.App.post('/forum/todas',(request,response)=>{

        var forum = request.body;

        console.log(forum);

        PG.Posts(forum.parameters, result =>{
            if(!result){
                response.json({msg : "Nada foi encontrado", erro : true});
                response.end();
            }else{
                response.json({result, sucess : true});
                response.end();
            }
        });

    })


}