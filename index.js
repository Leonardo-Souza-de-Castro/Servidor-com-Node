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

// Construção inicial do método get
app.get('/home', function(request, response){
    var nome =  request.query.nome; //Pegando as informações pela URL
    console.log(nome)
})

//Avisando o servidor que os dados agora serão recebidos via corpo da pagina, utilizamos isso para o método post
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Avisamos aqui que utilizaremos arquivos .ejs e eles se encontram na view
app.set('view engine', 'ejs')

app.set('views', './views');
//Após definir tudo isso devemos instalar o EJS com npm

// Método post criado, com a url do método e a função que o método deve realizar
app.post('/home', function(request, response){
    var email =  request.body.email; // Pegando os valores pelo corpo do html
    var senha =  request.body.senha;
    console.log(email)
    console.log(senha)

    response.render('response', {email, senha})
})