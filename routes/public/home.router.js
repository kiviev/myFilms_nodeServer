// const fs = require('fs');
const stream = require('services/stream.reader.service');
const FilmService = require('services/film.service');
const KoaRouter = require('koa-router');
const logger = require('logger.js')
// const HomeService = require('services/home.service');
const configApp = require('config/config');

const router = new KoaRouter({
    // prefix:'/home'
});

class HomeRouter {


    static async getHome(ctx) {
        logger.info('[ROUTER] Get Home');
        let users = [{nombre:'juan'}]
        let config = {title: 'My Films'};
        let films = await FilmService.getFilms();
        let data = {
            config,
            films : films ? films : []
        }
        await ctx.render('myfilms/index', { data });
    }



}



router.get('/', HomeRouter.getHome);


module.exports = router;