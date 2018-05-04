const FilmModel = require('models/film.model');
const logger = require('logger');


class FilmValidator {

    static async new(body) {
        logger.debug('[FilmValidator]@new');
        
        
        // if (ctx.errors) {
            //     ctx.body = ctx.errors;
            //     ctx.status = 400;
            //     return;
            // }
            
            let film ={
                adult :body.adult ? body.adult :undefined ,
                backdrop_path :body.backdrop_path ? body.backdrop_path :undefined ,
                genres :body.genres ? body.genres :undefined ,
                idapi:body.id ? body.id : undefined,
                imdb_id :body.imdb_id ? body.imdb_id :undefined ,
                original_language :body.original_language ? body.original_language :undefined ,
                homepage :body.homepage ? body.homepage :undefined ,
                original_title :body.original_title ? body.original_title :undefined ,
                overview :body.overview ? body.overview :undefined ,
                popularity :body.popularity ? body.popularity :undefined ,
                poster_path :body.poster_path ? body.poster_path :undefined ,
                // production_companies :body.production_companies ? body.production_companies :undefined ,
                release_date :body.release_date ? body.release_date :undefined ,
                title :body.title ? body.title :undefined ,
                // video :body.video ? body.video :undefined ,
                // role :body.role ? body.role :undefined ,
                vote_average :body.vote_average ? body.vote_average :undefined ,
                vote_count :body.vote_count ? body.vote_count :undefined ,
                videos :body.videos ? body.videos :undefined ,
                local :body.local ? body.local :undefined ,
                modelInfo :body.modelInfo ? body.modelInfo :undefined ,
                local :{
                    src :body.src ? body.src :undefined ,
                    url :body.url ? body.url :undefined ,

                }
                
            }
            film = new FilmModel(film);
            console.log(film);
            return film;
        }
        
        
    }
    
    
module.exports = FilmValidator;