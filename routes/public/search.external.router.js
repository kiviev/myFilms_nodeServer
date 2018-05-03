
const KoaRouter = require('koa-router');
const logger = require('logger.js');

const FilmService = require('services/film.service');
const ApiMovieService = require('services/api.themoviedb.service')

const router = new KoaRouter({
    prefix: '/search'
});

class SearchExternalRouter {


    static async getFilms(ctx) {
        logger.info('[SearchExternalRouter]@getHome');
        let config = { title: 'External films' }
        let films;
        let term;
        if((ctx.params.term !== undefined && ctx.params.term !== '') ){
             term = ctx.params.term;
        } else if (ctx.query.term !== undefined && ctx.query.term !== ''){
            term = ctx.query.term;
        } 
        if(term){
            films = await ApiMovieService.search(term);
        }        
        let data = {
            films : films ? films : [],
            config
        }
        await ctx.render('myfilms/index', { data });
    }

    static async getFilmsById(ctx) {
        logger.info('[SearchExternalRouter]@getSearchById');
        let config = { title: 'External films Get film by id' }
        // akira id 149
        let film = await ApiMovieService.searchById(parseInt(ctx.params.id));
        let data = {
            films: film ? [film] : [],
            config
        }        
        await ctx.render('myfilms/index', { data });
    }
    static async addHome(ctx) {

        logger.info('[SearchExternalRouter]@addHome');
        logger.info(ctx)
        let config = { title: 'Añadir films' }
        await ctx.render('myfilms/add', { config });
    }


}



// router.get('/', SearchExternalRouter.getHome); // ver mis peliculas
// router.get('/search', SearchExternalRouter.addHome); 
// router.get('/search/:id', SearchExternalRouter.getSearchById);
// router.get('/data', SearchExternalRouter.getSearchById);




router.get('/', SearchExternalRouter.getFilms) // ver usuarios
router.get('/:term', SearchExternalRouter.getFilms) // ver usuarios
router.get('/id/:id', SearchExternalRouter.getFilmsById) // ver usuarios por id 



module.exports = router;