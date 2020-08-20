drop table if exists tb_forum;

create table tb_forum (
    int_id serial not null primary key,
    text_title text,
    text_body text,
    date_dt_data date,
    text_autor text,
    text_id_autor text,    
    text_telefone_autor text,
    text_status text
);

drop table if exists tb_likes;

create table tb_likes(
    int_id_like serial not null primary key,
    int_id_forum int,
    text_id_client text
);

drop table if exists tb_denuncia;

create table tb_denuncia(    
    int_id_forum int,
    text_id_client text,
    date_dt_denuncia date
);

drop table if exists tb_clientes;

create table tb_clientes( 
    text_id_client text,
    date_dt_limit date
);


drop function if exists addlike;

create or replace function addlike(idpost int, idcliente text)

returns text as $msg$

declare 

	likes integer;
	
	msg text;
	
	begin
	
	select count(*) into likes from tb_likes where int_id_forum = idpost and text_id_client =  idcliente;	
	
	if likes > 0 then
	
	delete from tb_likes where int_id_forum = idpost and text_id_client = idcliente;
	
	 msg := 'Like removido';
	
	else
	
	insert into tb_likes(int_id_forum ,text_id_client) values (idpost,idcliente);
	
	msg := 'Like adicionado';
	
	end if;
	
	return msg;
	
END;

$msg$ LANGUAGE plpgsql;	


drop function is exists updatecliente;

create or replace function updatecliente(idcliente text, limitecliente text)

returns text as $msg$

declare 

	temcliente int;
	msg text;
	
	begin
	
	select count(*) into temcliente from tb_clientes where text_id_client = idcliente;
	
	if temcliente > 0 then
	
	delete from tb_clientes where text_id_client = idcliente;
	
	msg := 'Cliente atualizado';
	
	end if;
	
	insert into tb_clientes values (idcliente,date(limitecliente));
	
	msg := 'Cliente cadastrado';
	
	return msg;
	
	end;
	
	$msg$ LANGUAGE plpgsql;	
	