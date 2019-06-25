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
    name_ char(100) not null,
    age int,
    hability enum('Iniciante', 'Intermediário', 'Avançado'),
    primary key (idAuthor)
);

create table Receita (
	idRecipe int(5) not null AUTO_INCREMENT,
    title char(50),
    ingredients varchar(5000),
    prepMode varchar(5000),
    author int(5),
    primary key (idRecipe, author),
    foreign key (author) references Autor(idAuthor)
);

create table Restaurante(
	idRestaurant int(5) not null AUTO_INCREMENT,
    name_ char(100),
    adress char(100),
    primary key (idRestaurant)
);

create table Trabalhos (
	idAuthor int(5),
    idRestaurant int(5),
    primary key (idAuthor, idRestaurant),
    foreign key (idAuthor) references Autor(idAuthor),
    foreign key (idRestaurant) references Restaurante(idRestaurant));
    