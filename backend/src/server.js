const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();

//Url de conexão pega no mongodb atlas
mongoose.connect('mongodb+srv://grazionale:grazionale123@cluster0-thec5.mongodb.net/omnistack8?retryWrites=true&w=majority', 
    {useNewUrlParser: true}
);
//define que o express irá trabalhar com json
server.use(express.json());
//habilita o cors (tem que ser antes das routes)
server.use(cors());
//carrega o arquivo routes
server.use(routes);
//define que vai rodar na porta 3333
server.listen(3333);