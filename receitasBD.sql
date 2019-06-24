CREATE USER 'bolo.admin'@'localhost' IDENTIFIED BY 'bolo'; 
ALTER USER 'bolo.admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bolo'; 
GRANT ALL PRIVILEGES ON receitasBD.* TO 'bolo.admin'@'localhost';

DROP DATABASE IF EXISTS receitasBD;
CREATE DATABASE IF NOT EXISTS receitasBD;

ALTER USER 'bolo.admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bolo'; 
GRANT ALL PRIVILEGES ON receitasBD.* TO 'bolo.admin'@'localhost';

use receitasBD;

create table Autor (
	idAuthor int(5) not null AUTO_INCREMENT,
    pass char(50) not null,
    nome char(100) not null,
    age int,
    hability enum('Iniciante', 'Intermediário', 'Avançado'),
    primary key (idUser)
);
    
create table Trabalhos (
	idAuthor int(5),
    idRestaurant int(5),
    primary key (idAuthor, idRestaurant),
    foreign key (idAuthor) references Autor(idAuthor),
    foreign key (idRestaurant) references Restaurant(idRestaurant));
    
create table Receita (
	idReceita int(5) not null AUTO_INCREMENT,
    titulo char(50),
    ingredientes varchar(5000),
    modoPrep varchar(5000),
    autor int(5),
    primary key (idReceita, autor),
    foreign key (autor) references Usuario(idUser)
);

create table Restaurant(
	idRestaurant int(5) not null AUTO_INCREMENT,
    nome char(100)
);