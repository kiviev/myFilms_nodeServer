/* Ejemplo de como crear un servidor con expressjs */
var express = require('express');
const fs = require('fs');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('public'));
var ip = require('ip');
var port = require('./config/config.js').port;
var cors = require('cors');



class Server {
  constructor(){

  }

}


module.exports = Server;
