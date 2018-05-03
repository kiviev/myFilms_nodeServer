
const Url = require('url');
const logger = require('logger');
const NotFoundError = require('errors/not-found.error');
const axios = require('axios');

class HttpService {

    static parse(url){
        return Url.parse(url);
    }
    
    static getProtocol(url){
        return HttpService.parse(url).protocol;
    }

    static getHttpByProtocol(url){
        logger.warn(HttpService.getProtocol(url))
        return require(HttpService.getProtocol(url).split(':')[0]);
    }

    static async getDataUrl(url){
        
        return await axios.get(url)
            .then(response => {
                return response;
            })
            .catch(error => {
                logger.error( '[HttpServiceHttpService]@getDataUrl',  error);
            });

    }
}



module.exports = HttpService;