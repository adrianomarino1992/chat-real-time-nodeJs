let Utilidades = require('../Utilidades/Utilizadades');
let Util = new Utilidades();
let Clientes = [];


function ListarNames() {
    let Names = [];

    for (let c of Clientes) {
        Names.push(c.Name);
    }

    return Names;
}

exports.Start = (Http) => {

    let Socket = require('socket.io')(Http);

    Socket.on('connection', (Socket) => {

        Util.Console(Socket.id + ' Conectado');


        Socket.on('handshake', (msg) => {

            let cliente = {
                Socket: Socket,
                Name: msg.name
            }

            Clientes.push(cliente);

            let date = Util.Data();

            for (let c of Clientes) {
                
                    c.Socket.emit('handshake-done', { enter: `${date.hora}:${date.minuto} -- ${msg.name} Conectado `, names: ListarNames() });
                
            }

        })

        Socket.on('disconnect', function () {

            let del = null;
            let date = Util.Data();

            for (let c of Clientes) {
                if (c.Socket == Socket) {
                    del = c;                    
                }
            }
            if (del != null) {
                let index = Clientes.indexOf(del);
                Clientes.splice(index,1);  
                del.Socket.broadcast.emit('handshake-done', { enter : `${date.hora}:${date.minuto} -- ${del.Name} Desconectado `, names: ListarNames() });          
            }
        });

        Socket.on('disconnectMyName', (name) => {
            console.log(name);
        })

        Socket.on('send-msg', (msg) => {
            let date = Util.Data();
            for (let c of Clientes) {
                c.Socket.emit('sent-msg', { date: `${date.hora}:${date.minuto}`, msg: msg });
            }

        })

    })

}

exports.ReturnSockets = () => {
    return Clientes;
}