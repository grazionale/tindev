const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
//Toda vez que alguém se conectar na aplicação pelo protocolo websocket, recebemos o 'socket' que é a conexão entre back
//e front. Através dele é possível fazer a transmissão de mensagem em tempo real 
//Todo socket possui um ID que identifica para quem iremos retornar a mensagem 
const connectedUsers = {};
io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log(user, socket.id);
    connectedUsers[user] = socket.id;
});

//Url de conexão pega no mongodb atlas
mongoose.connect('mongodb+srv://grazionale:grazionale123@cluster0-thec5.mongodb.net/omnistack8?retryWrites=true&w=majority', 
    {useNewUrlParser: true}
);

/*
* midleware 
* Quando qualquer requisição chegar na aplicação, primeiramente será feito isto, depois seguirá para as linhas de baixo
* através do next. O midleware possibilita pegarmos qualquer req, res de qualquer requisição que chegar. E o next sinaliza
* que após realizar o que o midleware quer, ai sim segue o fluxo da aplicação.
*   -Especificamente, na função abaixo, estamos repassando o IO e connectedUsers para todas as demais requisições seguintes.
*/
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});
//define que o express irá trabalhar com json
app.use(express.json());
//habilita o cors (tem que ser antes das routes)
app.use(cors());
//carrega o arquivo routes
app.use(routes);
//define que vai rodar na porta 3333
server.listen(3333);