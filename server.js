/* Ejemplo de como crear un servidor con koa */
require('dotenv').config();
config = require('config/config');
const fs =require('fs');
const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');
const koaLogger = require('koa-logger');
const logger = require('logger.js');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const apiversion = process.env.API_VERSION;
// routers
const homeRouter = require('routes/public/home.router');
const editRouter = require('routes/public/edit.router');
const myfilmsRouter = require('routes/public/myfilms.router');
const searchExternalRouter = require('routes/public/search.external.router');
const filmsApiRouter = require('routes/' + apiversion + '/film.router');


const app = new Koa();
const ip = require('ip');
const port = process.env.PORT;

function onDBready(err) {
  if (err) {
    logger.error('Error conection: ', err);
    process.exit(1);
  }

}
app.use(koaLogger()); // loguear las request
app.use(bodyParser());
app.use(views(`${__dirname}/views`, {
  extension: 'ejs',  // es la extension por defecto si no me dicen ninguna extension
  map: {
    ejs: 'ejs'
  }
}));
app.use(serve(`${__dirname}/statics`)); 


app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);
    if (error.statusCode) {
      ctx.throw(error.statusCode, error.message);
    }
    // ctx.throw(500, 'Internal server error');
  }

})


app.use(homeRouter.middleware());
app.use(editRouter.middleware());
app.use(myfilmsRouter.middleware());
app.use(searchExternalRouter.middleware());
app.use(filmsApiRouter.middleware());

app.listen(port, (err) => {
  if (err) {
    // console.log(err);
  }
  console.log('Listening in ip: ' + ip.address() + ':' + port );
});


mongoose.connect(getMongoUri(config.dbuse), onDBready)


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


function getMongoUri(mongoconfig){
  let conf = config.db[mongoconfig];
  let uri='';
  switch (mongoconfig) {
    case 'mongo':
      uri = 'mongodb://' + conf.uri + ':' + conf.port + '/' + conf.dbname;
      break;
    case 'mongolab':
      uri = 'mongodb://' + conf.user + ':' + conf.password + '@' + conf.uri + ':' + conf.port + '/' + conf.dbname;
    default:
      logger.error('No Uri mongo');
      break;
    }
  logger.info('CONEXION to MONGO', mongoconfig , 'in:', uri)
    return uri;
}