create database receitasBD;
use receitasBD;

create table Usuario (
	idUser char(15) primary key,
    senha char(50) not null,
    nome char(100) not null,
    email char(50));
    
create table Amizade (
	idUser_1 char(15),
    idUser_2 char(15),
    primary key (idUser_1, idUser_2),
    foreign key (idUser_1) references Usuario(idUser),
    foreign key (idUser_2) references Usuario(idUser));
    
create table Receita (
	idReceita int,
    titulo char(50),
    ingredientes varchar(5000),
    modoPrep varchar(5000),
    autor char(15),
    primary key (idReceita, autor),
    foreign key (autor) references Usuario(idUser));