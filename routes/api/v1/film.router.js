
const KoaRouter = require('koa-router');
const logger = require('logger.js')
const FilmService = require('services/film.service');
const configApp = require('config/config');
const router = new KoaRouter({
    prefix: configApp.apiversionpath +'/myfilms'
});

class FilmRouter {
// akira id 149

    static async getFilms(ctx) {
        // ctx.body = 'GET getFilms';
        logger.info('[API-FilmRouter] Get Films');
        // let roles;
        // if (ctx.request.query.role) {
        //     roles = ctx.request.query.role.split(',');
        // }
        ctx.body = await FilmService.getFilms();
    }


    static async getFilmById(ctx) {
        // ctx.body = 'GET FilmsById';
        logger.info('[API-FilmRouter] Obtaining Film with id ' + ctx.params.id);
        ctx.body = await FilmService.getFilmById(ctx.params.id);
    }

    static async createFilm(ctx) {
        // ctx.body = 'POST createFilm';
        logger.info('[API-FilmRouter] Createing Film with body ' + ctx.request.body);
        // ctx.body = await FilmService.createFilm(ctx.request.body);

    }

    static async updateFilm(ctx) {
        // ctx.body = 'PUT updateFilm';
        logger.info('[API-FilmRouter] updating Film with id ' + ctx.params.id);
        // ctx.body = await FilmService.updateFilmById(ctx.params.id);

    }
    static async deleteFilms(ctx) {
        ctx.body = 'DELETE deleteFilms';
        logger.info('[API-FilmRouter] deleting Film with id ' + ctx.params.id);
        // ctx.body = await FilmService.deleteFilmById(ctx.params.id);

    }


}



router.get('/', FilmRouter.getFilms)
router.get('/:id', FilmRouter.getFilmById)
router.post('/', FilmRouter.createFilm)
router.put('/:id', FilmRouter.updateFilm)
router.delete('/:id', FilmRouter.deleteFilms)


module.exports = router;