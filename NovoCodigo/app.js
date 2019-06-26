const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 8000; //porta padrão
// var session = require('express-session');
var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');

// conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'bolo.admin',
    password: 'bolo',
    database: 'receitasBD'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado!');
});
global.db = db;

const { adicionarAutor } = require('./routes/author');
const { buscarAutor } = require('./routes/author');

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);//call for main index page
app.post('/cadastroAutor', adicionarAutor);
app.post('/autores', buscarAutor);

app.listen(port)

app.get('/author', (req, res) => {
    res.render('autores.ejs')
})

app.get('/cadastroAutor', (req, res) => {
    res.render('cadastroAutor.ejs')
})

app.get('/receitas', (req, res) => {
    res.render('receitas.ejs')
})

app.get('/index', (req, res) => {
    res.render('index.ejs')
})