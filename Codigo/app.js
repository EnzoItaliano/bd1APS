const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 8000; //porta padrão
// var session = require('express-session');
var routes = require('./routes');
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


const { adicionarAutor, buscarAutor, removerAutor, detalharAutor, editAutor } = require('./routes/author');
const { adicionarReceita, buscarReceita, removerReceita, detalharReceita, editReceita, lerReceita, detalharAutores } = require('./routes/receitas');
// const { buscarAutor } = require('./routes/author');



app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);//call for main index page
app.post('/cadastroAutor', adicionarAutor);
app.get('/author', buscarAutor);
app.post('/autores', buscarAutor);
app.get('/author/:id', removerAutor);
app.get('/author/editar/:id', detalharAutor);
app.post('/author/editar', editAutor);

app.post('/cadastroReceita', adicionarReceita);
app.get('/receitas', buscarReceita);
app.post('/receitas', buscarReceita);
app.get('/receitas/:id', removerReceita);
app.get('/receitas/editar/:id', detalharReceita);
app.get('/cadastroReceita', detalharAutores);
app.get('/receitas/ler/:id', lerReceita);
app.post('/receitas/editar', editReceita);

app.get('/cadastroAutor', (req, res) => {
    res.render('cadastroAutor.ejs')
})

// app.get('/cadastroReceita', (req, res) => {
//     res.render('cadastroReceita.ejs')
// })

app.get('/index', (req, res) => {
    res.render('index.ejs')
})

app.listen(port)




