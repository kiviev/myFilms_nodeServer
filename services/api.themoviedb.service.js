const logger = require('logger');
const NotFoundError = require('errors/not-found.error');
const config = require('config/config').ApiThemoviedbConfig;
const httpService = require('services/http.service');

class ApiThemoviedbService {
    constructor(){
        this.baseurl = config.baseurl;
        this.apiKey = config.apiKey;
        this.imageBaseUrl = config.imageBaseUrl;
        this.youtubeUrl = config.youtubeUrl;
        this.adult = config.adult || false;

        this.language = this.language || 'es-ES';
        this.page = 1;
        this.params = {   
            apiKey: 'api_key=' + this.apiKey,
            page: 'page=' + this.page ,
            adult: 'include_adult=' + this.adult,
            query: 'query=',
            language : 'language=' + this.language,
            append_to_response: 'append_to_response='
        };    
    }

    async search(term){
        let  searchUrl = this.baseurl + 'search/movie?' + this.params.language + '&' + this.params.apiKey + '&' + this.params.page + '&' + this.params.adult + '&' + this.params.query + term;
        logger.info('[ApiThemoviedbService] Buscando termino' , term , 'URL:' +searchUrl);
        
        let request = await httpService.getDataUrl(searchUrl);
        let fineData;
        if (request && request.status >= 200 && request.status < 400) {
            if(request.data.results.length){
                fineData = await request.data.results.map(async element => {
                    return await this.searchById(element.id);               
                });
            }
            return await Promise.all(fineData).then((values)=> {return values}).catch(()=>{return []});
        }
        else return { 'Error': 'Error in request data' };
    }
    
    async searchById(id,type = 'videos'){
        
        let searchById = this.baseurl + 'movie/' + id + '?' + this.params.language + '&' + this.params.append_to_response + type + '&' + this.params.apiKey;
        logger.info('[ApiThemoviedbService] Buscando por id' , id , ', y tipo:' + type , 'URL:' , searchById);
        let request = await httpService.getDataUrl(searchById);

        if(request && request.status >= 200 && request.status < 400){
            
            if (request.data) {
                request.data.poster_path = request.data.poster_path ? this.imageBaseUrl + request.data.poster_path : '/assets/img/404.svg';
                request.data.backdrop_path = request.data.backdrop_path ? this.imageBaseUrl + request.data.backdrop_path : '/assets/img/404.svg';
                if(request.data.videos.results.length){
                    request.data.youtubeVideo = request.data.videos.results[request.data.videos.results.length - 1].key ? this.youtubeUrl + request.data.videos.results[0].key : undefined;
                }
            }
            request.data.extends = true;
            return request.data;
        }
        else return {'Error' : 'Error in request data'};
    }


}


module.exports = new ApiThemoviedbService();