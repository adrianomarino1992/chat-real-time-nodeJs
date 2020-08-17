let Utilidades = require('../Utilidades/Utilizadades');
let Util = new Utilidades();
let Clientes = [];
let Messages = [];


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
           
            
            let date = Util.Data();

            let thisNames = ListarNames();

            thisNames.push(cliente.Name);

            for (let c of Clientes) {   
                             
                    c.Socket.emit('handshake-done', { enter: `${date.dia}/${date.mes} ${date.hora}:${date.minuto} -- ${msg.name} Conectado `, names: thisNames, msgs : []});                
            }
            Clientes.push(cliente);

            cliente.Socket.emit('handshake-done', { enter: `${date.dia}/${date.mes} ${date.hora}:${date.minuto} -- ${msg.name} Conectado `, names: ListarNames(), msgs : Messages });

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
                del.Socket.broadcast.emit('handshake-done', { enter : `${date.dia}/${date.mes} ${date.hora}:${date.minuto} -- ${del.Name} Desconectado `, names: ListarNames() });          
            }
        });

        Socket.on('disconnectMyName', (name) => {
            console.log(name);
        })

        Socket.on('image', (data) => {
            for(let u of Clientes){                
                    u.Socket.emit('imageing',{image : data })                
            }
        })

        Socket.on('digitando', (msg) => {
            let user = msg.name;

            for(let u of Clientes){
                if(u.name != user){
                    u.Socket.emit('response-digitando',{name : user , status : true })
                }
            }
        })

        Socket.on('digitandOut', (msg) => {
            let user = msg.name;

            for(let u of Clientes){
                if(u.name != user){
                    u.Socket.emit('response-digitando',{name : user , status : false })
                }
            }
        })

        Socket.on('send-msg', (msg) => {
            
            let date = Util.Data();

            Messages.push({from : msg.name , msg : { date: `${date.dia}/${date.mes} ${date.hora}:${date.minuto}`, msg: msg } });
            console.log(Messages);
            for (let c of Clientes) {
                c.Socket.emit('sent-msg', { date: `${date.dia}/${date.mes} ${date.hora}:${date.minuto}`, msg: msg });
            }

        })

    })

}

exports.ReturnSockets = () => {
    return Clientes;
}