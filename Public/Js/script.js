
var socket;
var NAME;

$('#entrar').on('click', () => {

    if($('#user') == "789" && $('#password')=="123456789"){
        let name = $('#name').val().trim();
        if (name == '') {
            alert('Nome vazio');
        } else {
            IO(name);
            NAME = name;
            $('#login-back').fadeOut();
        }
    }else{
        alert('Acesso negado ! ');
    }



    
})


function IO(name) {

    socket = io();

    socket.on('connect', () => {
        socket.emit('handshake', { name: name });
    });   

    socket.on('disconnect', function(){ 
    });

    socket.on('handshake-done', (msg) => {
        console.log(msg);
        $('#msg-box').prepend(`
    
    <div class="msg-card">
            <h2>${msg.enter}</h2>           
    </div>
    `);

    $('#usuarios').empty();
    for(let u of msg.names){
        $('#usuarios').append(`<h2>${u}</h2>`);
    }
    
    });

    socket.on('sent-msg', (msg) => {

        $('#msg-box').prepend(`
    
    <div class="msg-card">
            <h2>${msg.date} -- ${msg.msg.name}</h2>
            <h3>${msg.msg.msg}</h3>
    </div>
    `);
    });
}



$('#enviar').on('click', () => {    

    let msg = $('#msg').val().trim();

    if (msg == '') {
        alert('Mensagem vazia');
    } else {
        socket.emit('send-msg', { name: NAME, msg: msg });
        $('#msg').val('');
    }
})