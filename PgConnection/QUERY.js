exports.ADDForum = (forum) =>{
    return `
    INSERT INTO tb_forum(
    text_title,
    text_body,
    date_dt_data,
    text_autor,
    text_id_autor,
    text_telefone_autor,    
    text_status) 
    VALUES('${forum.Title}','${forum.Body}',now(),'${forum.Autor}','${forum.Id_Autor}','${forum.Telefone}','Em analise');
    `;
}

exports.Like = (Id,Cliente) =>{
 
    return `select addlike(${Id},'${Cliente}');`;
}

exports.Posts = (filtro = "", cliente)=>{
    return `select fo.*, case when lk.likes is null then 0 else lk.likes end as "nlikes", cli.liked as "nliked"  from tb_forum as "fo" left join (select int_id_forum , count(*) as "likes" from tb_likes group by int_id_forum) 
    as "lk" on fo.int_id = lk.int_id_forum left join (select int_id_forum, 1 as "liked" from tb_likes where text_id_client = '${cliente}') as cli on cli.int_id_forum = 
    fo.int_id ${filtro}  limit 20`;
}

exports.Report = (Id,Cliente)=>{
    return `insert into tb_denuncia values (${Id},'${Cliente}',now());`;
}