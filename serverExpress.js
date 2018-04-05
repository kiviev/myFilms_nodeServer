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
// app.use(express.static('data'));
// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(cors());

app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/video.js/dist/'),
    express.static(__dirname + '/node_modules/firebase/'),
    express.static(__dirname + '/node_modules/bootstrap/dist/css'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js')
]);
app.get('/',function(request, response){
	// res.header("Access-Control-Allow-Origin", "*");
 //  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  response.sendFile(__dirname +'/index.html');
});
app.get('/edit',function(request, response){
  response.sendFile(__dirname +'/public/edit.html');
});

app.post('/edit',function(request, response){
  // console.log(request);
  let body = request.body;
  console.log(body.type);
  readJsonFile(body);
  // response.sendFile(__dirname +'/public/edit.html');
});
app.listen(port, function(){
  console.log('Server Express Ready!');
  console.log('in ip: ' + ip.address() + ':' + port);
});


function readJsonFile(newInput){
  let fileJsonPath = './public/data/pelis.json';
  /*
  {
		"title" : "Infiltrado",
		"urlinfo" : "https://www.plusdede.com/peli/the-infiltrator-1",
		"filmafinity" : "https://www.filmaffinity.com/es/film158409.html",
		"img" : "https://cdn3.plusdede.com/cdn/media/peli/6/6/4/7/6-medium.jpg?v=0",
		"description" : "Esta es una descripción",
		"video" : {
			"server" : "openload",
			"url": "https://1fgm8rg.oloadcdn.net/dl/l/pxKh_LOSmw_ewVZu/cdn9JrCH1xo/1n_fi1_7r4_d0+-+GiUpload+5.1+HDrip.avi.mp4?mime=true"
		}
	}*/

  let obj = JSON.parse(fs.readFileSync(fileJsonPath, 'utf8'));
  obj.push(formatObject(newInput));
  console.log('antes del sort');
  console.log(obj);

  obj.sort();
  console.log('despues del sort');
  console.log(obj);
  fs.writeFile(fileJsonPath, JSON.stringify(obj), 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
}


function formatObject(obj){
  return  {
  		"title" : obj.title,
  		"urlinfo" : obj.urlinfo,
  		"filmafinity" : obj.urlfilmafinity,
  		"img" : obj.urlimage,
  		"description" : obj.description,
  		"video" : {
  			"server" : obj.nameserver,
  			"url": obj.urlvideo
  		}
  	};
}
