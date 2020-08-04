const { Pool, Client } = require('pg');
var Query = require('./QUERY');


var Connection = new Pool({
    user: 'boszjnqzrcaxtj',
    host: 'ec2-174-129-224-157.compute-1.amazonaws.com',
    database: 'd8k3jf5kjl9ve0',
    password: 'de0bc5a682f18a95416bd2c986903dedb8e64546507fd6e6d432aa5a6af9accf',
    port: 5432,
})


var ADDforum = (forum, callback)=>{

    let insert = Query.ADDForum(forum);
   
    Connection.query(insert,(err,result)=>{
        if(err){
            console.log(err);
            return callback(false);
        }else{
            return callback(true);
        }
    })
}

exports.ADDForum = ADDforum;


var Like = (forum, callback)=>{
    
    let like = Query.Like(forum.Id,forum.Cliente); 

    Connection.query(like,(err,result)=>{
        if(err){
            console.log(err);
            return callback(false);
        }else{
            return callback(true);
        }
    })
}

exports.Like = Like;


var Posts = (parametros, callback)=>{

    let posts = Query.Posts(parametros.Filtro, parametros.Cliente);
    console.log(posts);
    Connection.query(posts,(err,result)=>{
        if(err){
            console.log(err);
            return callback(false);
        }else{
            return callback(result.rows);
        }
    })
}

exports.Posts = Posts;


var Denucnia = (forum, callback)=>{
    
    let report = Query.Report(forum.Id,forum.Cliente); 

    Connection.query(report,(err,result)=>{
        if(err){
            console.log(err);
            return callback(false);
        }else{
            return callback(true);
        }
    })
}

exports.Denucnia = Denucnia;