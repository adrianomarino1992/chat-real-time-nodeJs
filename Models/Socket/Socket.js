let Utilidades = require('../Utilidades/Utilizadades');
let Util = new Utilidades();
let Clientes = [];
let Names = [];
exports.Start = (Http) => {
    let Socket = require('socket.io')(Http);
    Socket.on('connection', (Socket) => {
        Util.Console(Socket.id + ' Conectado');

        Clientes.push(Socket);

        Socket.on('handshake', (msg) => {
            let date = Util.Data();
            Names.push(msg.name);
            for (let c of Clientes) {
                if(c != Socket){
                c.emit('handshake-done', { enter: `${date.hora}:${date.minuto} -- ${msg.name} Conectado `, names: Names });
                }
            }

        })    
        
        Socket.on('disconnect', function (msg) {
            console.log(msg);
        }); 


        Socket.on('send-msg', (msg) => {
            let date = Util.Data();
            for (let c of Clientes) {
                c.emit('sent-msg', { date: `${date.hora}:${date.minuto}`, msg: msg });
            }

        })

    })

}

exports.ReturnSockets = () => {
    return Clientes;
}