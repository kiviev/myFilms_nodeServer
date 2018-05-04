const KoaRouter = require('koa-router');
const logger = require('logger.js');

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
        };        
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

    static async createFilm(ctx) {
        logger.info('[MyFimsRouter]@getFilmsById');
        // akira id 149
        let config = { title: 'Film' }
        let films = await FilmService.getFilms();
        let film = await ApiMovieService.searchById(parseInt(ctx.params.id));
        let data = {
            films: [],
            config
        };
        
        if(film){
            
            film.src = ctx.request.body.file;
            film.url = ctx.request.body.url;
            
            let newFilm = await FilmService.createFilm(film);
            let data = {
                films : newFilm ? [newFilm] : [] ,
                config
            };   
            // ctx.body = data.films;
        }
        await ctx.render('myfilms/index', { data });
    }
}



// router.get('/', MyFimsRouter.getHome); // ver mis peliculas
// router.get('/search', MyFimsRouter.addHome); 
// router.get('/search/:id', MyFimsRouter.getSearchById);
// router.get('/data', MyFimsRouter.getSearchById);




router.get('/', MyFimsRouter.getFilms) // ver usuarios
router.get('/:id', MyFimsRouter.getFilmsById) // ver usuarios por id 
router.post('/add/:id', MyFimsRouter.createFilm) // preparar para añadir a bd



module.exports = router;