// Inicializando o modulo http
var http = require('http');

// Inicializando o pacote do express
var express = require('express');

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


const MongoClient = require("mongodb").MongoClient; //Inicializando a bibilioteca do MongoDb

const uri = "mongodb+srv://leonardo:guilherme85@leonardo.dvsd60e.mongodb.net/?retryWrites=true&w=majority"; //Definindo a URI de acesso do banco

const client = new MongoClient(uri, {useNewUrlParser: true}) //Faz a conexão com o banco de dados

// Método post criado, com a url do método e a função que o método deve realizar
app.post('/cadastro', function(request, response){ //Inicio da função post
    client.db("exemplo_bd").collection("usuarios").insertOne( //Aqui eu indico o nome do banco e qual a collection ele vai utilizar e qual função ele vai utilizar no caso insertOne (cadastro)
        {db_email: request.body.email, db_senha: request.body.senha}, function (err) //Aqui ele inidica quais o campos da collection usuarios existirão e quais serão atribuidos
        { 
            if (err){
                // response.render('response', {resposta: "Erro ao cadastrar usuario"}) //Resposta que vai ser renderizada caso de erro
                response.render('response', {resposta: "Erro ao cadastrar usuario"})
            }
            else{
                //response.render('response', {resposta: "Usuario cadastrado com sucesso!"}) //Resposta que vai ser renderizada caso de certo
                response.render('response', {resposta: "Usuario cadastrado com sucesso!"})
            };
        });
      });

app.post("/logar_usuario", function(request, response) {
    // realiza conexão com banco de dados
  client.connect((err) => {
      // busca um usuário no banco de dados
    client.db("exemplo_bd").collection("usuarios").find( //.find significa que eu estou buscando algo
      {db_email: request.body.email, db_senha: request.body.senha }).toArray(function(err, items) //Indica quais informações serão recebidas da tela
    {
        console.log(items);
        if (items.length == 0) { //Caso o usuario venha vazio ele valida e indica que o usuario não foi encontrado
          response.render('response', {resposta: "Usuário/senha não encontrado!"})
        }else if (err) { //Resposta caso de erro
          response.render('response', {resposta: "Erro ao logar usuário!"}) //utilizamos render para mandar para ejs e redirect para mandar para html
        }else { //Resposta se deu tudo certo
          response.render('response', {resposta: "Usuário logado com sucesso!"})  
        };
      });
  }); 
});

app.post("/atualizar_usuario", function(req, resp) { 
  // função criada para atualizar informações
  client.db("exemplo_bd").collection("usuarios").updateOne( // A função de updateOne serve para atualizar informações de uma determina informação em uma collection
      {db_email: request.body.email, db_senha: request.body.senha}, // Identifica qual objeto vai ser alterado comparando email e senha
      { $set: {db_senha: req.body.novasenha} }, function (err, result) { // faz um set do campo senha pela nova senha
        console.log(result);
        if (result.modifiedCount == 0) { //Valida quantos campos foram atualizados
          resp.render('response', {resposta: "Usuário/senha não encontrado!"})
        }else if (err) {
          resp.render('response', {resposta: "Erro ao atualizar usuário!"})
        }else {
          resp.render('response', {resposta: "Usuário atualizado com sucesso!"})       
        };
  });
 
});
app.post("/remover_usuario", function(req, resp) {

  // remove do usuário
  client.db("exemplo_bd").collection("usuarios").deleteOne(
    {db_email: request.body.email, db_senha: request.body.senha} , function (err, result) {
      console.log(result);
      if (result.deletedCount == 0) {
        resp.render('response', {resposta: "Usuário/senha não encontrado!"})
      }else if (err) {
        resp.render('response', {resposta: "Erro ao remover usuário!"})
      }else {
        resp.render('response', {resposta: "Usuário removido com sucesso!"})       
      };
    });

});

 
   
