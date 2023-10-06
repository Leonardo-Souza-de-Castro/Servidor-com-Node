// Inicializando o modulo http
var http = require('http');

// Inicializando o pacote do express
var express = require('express');
const { listen } = require('express/lib/application');

// Criando a variavel app, para podermos acessar o metodos do pacote express
var app = express();

// Mostrando pro pacote em que pasta esta os arquivos a serem rodados
app.use(express.static('./public'));

// Criando servidor http
var server = http.createServer(app);

// Porta onde o servidor vai rodar
// Por padrao a porta vem na 80
server.listen(3000);

// Mensagem exibida quando inicializar o servidor
console.log("servidor rodando ...");