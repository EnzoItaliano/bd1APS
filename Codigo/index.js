const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 8000; //porta padrão
var session = require('express-session');
var routes = require('./routes');
var user = require('./routes/user');
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

//gerenciamento de sessão
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 

app.listen(port)

app.get('/signup', (req, res) => {
  res.render('signup.ejs')
})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})

app.get('/index', (req, res) => {
  res.render('index.ejs')
})