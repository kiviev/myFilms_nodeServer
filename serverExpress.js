/* Ejemplo de como crear un servidor con expressjs */
var express = require('express');
var app = express();
app.use(express.static('public'));
// app.use(express.static('data'));
// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/video.js/dist/'),
    express.static(__dirname + '/node_modules/firebase/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/css'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js')
]);
app.get('/',function(request, response){
  response.sendFile(__dirname +'/index.html');
});
app.get('/edit',function(request, response){
  response.sendFile(__dirname +'/public/edit.html');
});
app.listen(3000, function(){
  console.log('Server Express Ready!');
});