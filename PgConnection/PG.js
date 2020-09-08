const { Pool, Client } = require('pg');
var Query = require('./QUERY');

//HEROKU




var Connection = new Pool({
    user: 'boszjnqzrcaxtj',
    host: 'ec2-174-129-224-157.compute-1.amazonaws.com',
    database: 'd8k3jf5kjl9ve0',
    password: 'de0bc5a682f18a95416bd2c986903dedb8e64546507fd6e6d432aa5a6af9accf',
    port: 5432
})




var TOKEN = 'bjdlf=slow9d0sozz=sayreejslsnbdgkag33sgdlks#sd_djmsgaldh';


/*

var Connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'forumdb',
    password: '123',
    port: 5432,
})

*/


var ADDforum = (forum, callback) => {

    let insert = Query.ADDForum(forum);

    Connection.query(insert, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(true);
        }
    })
}

exports.ADDForum = ADDforum;


var Like = (forum, callback) => {

    let like = Query.Like(forum.Id, forum.Cliente);

    Connection.query(like, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(true);
        }
    })
}

exports.Like = Like;


var Posts = (parametros, callback) => {

    let posts;

    if(parametros.GET)
    {
        posts = Query.GetPosts(parametros.Filtro, parametros.Cliente);
    }else{
        posts = Query.Posts(parametros.Filtro);
    }
    
    console.log(posts);
    Connection.query(posts, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(result.rows);
        }
    })
}

exports.Posts = Posts;

var Init = (callback) => {

    let init = Query.Init();    
    Connection.query(init, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(result.rows);
        }
    })
}

exports.Init = Init;

var DeletePost = (id, callback) => {

    let del = Query.DeletePost(id);    
    Connection.query(del, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(true);
        }
    })
}

exports.DeletePost = DeletePost;


var AlteraPost = (id, value, callback) => {

    let up = Query.AlteraPost(id,value);    
    Connection.query(up, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(true);
        }
    })
}

exports.AlteraPost = AlteraPost;




var Denucnia = (forum, callback) => {

    let report = Query.Report(forum.Id, forum.Cliente);

    Connection.query(report, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        } else {
            return callback(true);
        }
    })
}

exports.Denucnia = Denucnia;


var Clients = (req, callback) => {

   
    if (req.Token == TOKEN) {
       
        let insert = Query.Client(req);
        console.log(insert)
        Connection.query(insert, (err, result) => {
            console.log(result.rows);
            if (err) {
                console.log(err);
                return callback(false);
            } else {
                return callback(true);
            }
            
        })
    }else{
        return callback(false);
    }
}

exports.Clients = Clients;