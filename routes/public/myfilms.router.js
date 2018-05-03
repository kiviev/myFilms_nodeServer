// const fs = require('fs');
// const stream = require('services/stream.reader.service');
const KoaRouter = require('koa-router');
const logger = require('logger.js')
// const HomeService = require('services/home.service');
// const configApp = require('config/config');

const FilmService = require('services/film.service');
const ApiMovieService = require('services/api.themoviedb.service')

const router = new KoaRouter({
    prefix:'/myfilms'
});

class MyFimsRouter {


    static async getFilms(ctx) {
        logger.info('[MyFimsRouter]@getHome');
        let config = { title: 'My films' }
        let films = await FilmService.getFilms();
        let data = {
            films,
            config
        }
        console.log(films);
        
        await ctx.render('myfilms/index', { data });
    }
    
    static async getFilmsById(ctx){
        logger.info('[MyFimsRouter]@getSearchById');
        // akira id 149
        let body = await ApiMovieService.searchById(parseInt(ctx.params.id));
            ctx.body = body;
    }
    static async addHome(ctx){
        
        logger.info('[MyFimsRouter]@addHome');
        logger.info(ctx)
        let config = { title: 'Añadir films' }
        await ctx.render('myfilms/add', { config });
    }

    static async getPrepareFilm(ctx) {
        logger.info('[MyFimsRouter]@getFilmsById');
        // akira id 149
        let body = await ApiMovieService.searchById(parseInt(ctx.params.id));
        ctx.body = body;
    }
}



// router.get('/', MyFimsRouter.getHome); // ver mis peliculas
// router.get('/search', MyFimsRouter.addHome); 
// router.get('/search/:id', MyFimsRouter.getSearchById);
// router.get('/data', MyFimsRouter.getSearchById);




router.get('/', MyFimsRouter.getFilms) // ver usuarios
router.get('/:id', MyFimsRouter.getFilmsById) // ver usuarios por id 
router.get('/add/:id', MyFimsRouter.getPrepareFilm) // preparar para añadir a bd



module.exports = router;