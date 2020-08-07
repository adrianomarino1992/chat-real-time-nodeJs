let express = require('express');
let Socket = require('./Socket/Socket')
let App = express();
let Http = require('http').createServer(App);


let Utilidades = require('./Utilidades/Utilizadades');

let Util = new Utilidades();

exports.Start = (port) => {

    Http.listen(port, () => {
        Util.Console('Servidor Rodando na porta ' + port);
    })

    Socket.Start(Http);
}

exports.App = () =>{
   
    return {
        App,
        Http,
        Util,
        Socket :  Socket.ReturnSockets()
    };
}
