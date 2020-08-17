
var socket;
var NAME;

$('#entrar').on('click', () => {

    if ($('#user').val() == "1" && $('#password').val() == "1") {
        let name = $('#name').val().trim();
        if (name == '') {
            alert('Nome vazio');
        } else {
            IO(name);
            NAME = name;
            $('#login-back').fadeOut();
            $('#IMAGE').fadeIn();
        }
    } else {
        alert('Acesso negado ! ');
    }




})



function StartMessageBox(msgs) {


    for (let m of msgs) {

        $('#msg-box').prepend(`
    
    <div class="msg-card">
            <h2>${m.msg.date} -- ${m.msg.msg.name}</h2>
            <h3>${m.msg.msg.msg}</h3>
    </div>
    `);
    }

}


function IO(name) {

    socket = io();

    socket.on('connect', () => {
        socket.emit('handshake', { name: name });
    });

    socket.on('disconnect', function () {
    });

    socket.on('handshake-done', (msg) => {
        console.log(msg);
        $('#msg-box').prepend(`    
    <div class="msg-card">
            <h2>${msg.enter}</h2>           
    </div>
    `);
        if(msg.msgs && msg.msgs.lenght > 0){       
            StartMessageBox(msg.msgs);
        }

        $('#usuarios').empty();
        for (let u of msg.names) {
            $('#usuarios').append(`<h2 name="${u}">${u}</h2>`);
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

    socket.on('imageing',(data)=>{

        setTimeout(()=>{
            
            $('#IMAGE').attr('src',`data:image/png;base64, ${data.image}`);
        },200)
        
    })

    socket.on('response-digitando', (msg) => {
        
        let cards_user = $('#usuarios h2');
        for (let u of cards_user) {
            
            if ($(u).attr('name') == msg.name) {
                $(u).empty();
                if (msg.status == true) {
                    $(u).append(msg.name + `<br> <span class="digitando"> digitando...
                    </span>`);
                } else {                    
                    $(u).text(msg.name);
                }
            }
        }
    })
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


$('#msg').on('keypress', (event) => {
    if (event.keyCode === 13) {
        $('#enviar').click();
    }
})


$('#msg').on('focus', () => {
    socket.emit('digitando', { name: NAME });
})
$('#msg').on('focusout', () => {
    socket.emit('digitandOut', { name: NAME });
})