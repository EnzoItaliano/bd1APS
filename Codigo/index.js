const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 8000; //porta padrão
var session = require('express-session');
var routes = require('./routes');

// conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'receitasBD'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado!');
});
global.db = db;

//gerenciamento de sessão
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', routes.index);//call for main index page
app.listen(port)