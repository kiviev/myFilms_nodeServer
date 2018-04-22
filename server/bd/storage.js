const fs = require('fs');

class Storage {
  constructor(bd){
    this.bd = bd;

  }

  readJsonFile(newInput){
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

  formatObject(obj){
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

}


module.exports = Storage;
