const logger = require('logger');
const NotFoundError = require('errors/not-found.error');
const DuplicateFilmError = require('errors/duplicate-film.error');
const FilmModel = require('models/film.model');
const FilmSerialize = require('serializers/film.serialize');

class FilmService {

    static async getFilms() {
        logger.info('[FilmService]@getFilms');
        const filter = {};
       
        return FilmModel.find(filter).select("-__v");
    }

    static async getFilmById(id) {
        logger.info('[FilmService]@getFilmById');
        let filter= {
            idapi:id
        }
        const film = await FilmModel.find(filter).select("-__v");
        if (!film) {
            throw new NotFoundError('Film not found');
        }
        return film;
    }

    static async createFilm(body) {
        logger.info('[FilmService]@createFilm');
        const exist = await FilmModel.findOne({ idapi: body.idapi });
        if (exist) {
            throw new DuplicateUserError('Film idapi', body.idapi, 'exists');
        }
        let film = await FilmSerialize.new(body);
        if(film){
            await film.save();
            return film; 
        }
        else{
            throw new NotFoundError('Create Film not found')
            logger.error('[FilmService]@createFilm' , 'Film not saved');
        }
    }

    static async updateFilmById(id, body) {
        logger.info('[FilmService]@updateFilmById');
        const film = await FilmService.getFilmById(id);
        film.local.filename = body.filename;
        film.local.filetype = body.filetype;
        film.local.src = body.src;
        await film.save();
        return film
    }

    static async deleteFilm(id) {
        logger.info('[FilmService]@deleteFilm');
        const film = await FilmService.getFilmById(id);
        if(film){
            film.delete();
            return film;
        }
        throw new NotFoundError('Delete film not found');
    }




}


module.exports = FilmService;