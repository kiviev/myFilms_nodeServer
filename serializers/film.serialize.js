const FilmModel = require('models/film.model');

class FilmValidator {

    static async new(body) {
        logger.debug('[FilmValidator]@new');

        if (ctx.errors) {
            ctx.body = ctx.errors;
            ctx.status = 400;
            return;
        }

        let film ={
            adult :adult ? adult :undefined ,
            backdrop_path :backdrop_path ? backdrop_path :undefined ,
            genre :genre ? genre :undefined ,
            idapi:id ? id : undefined,
            imdb_id :imdb_id ? imdb_id :undefined ,
            original_language :original_language ? original_language :undefined ,
            original_title :original_title ? original_title :undefined ,
            overview :overview ? overview :undefined ,
            popularity :popularity ? popularity :undefined ,
            poster_path :poster_path ? poster_path :undefined ,
            production_companies :production_companies ? production_companies :undefined ,
            release_date :release_date ? release_date :undefined ,
            title :title ? title :undefined ,
            video :video ? video :undefined ,
            role :role ? role :undefined ,
            vote_average :vote_average ? vote_average :undefined ,
            vote_count :vote_count ? vote_count :undefined ,
            videos :videos ? videos :undefined ,
            local :local ? local :undefined ,
            modelInfo :modelInfo ? modelInfo :undefined ,

        }
        film = new FilmModel(film);
        return film;
    }


}


module.exports = FilmValidator;