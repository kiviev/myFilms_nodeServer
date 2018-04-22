// const fs = require('fs');
const stream = require('services/stream.reader.service');
const KoaRouter = require('koa-router');
const logger = require('logger.js')
// const HomeService = require('services/home.service');
// const configApp = require('config/config');

const router = new KoaRouter({
    prefix:'/myfilms'
});

class MyFimsRouter {


    static async getHome(ctx) {
        logger.info('[ROUTER] Get Home My Films');
        let config = { title: 'My films' }
        await ctx.render('myfilms/index', { config });
    }
    
    static async addHome(ctx){
        
        logger.info('[ROUTER] Get Add My Films');
        let config = { title: 'Añadir films' }
        await ctx.render('myfilms/add', { config });
    }


}



router.get('/', MyFimsRouter.getHome);
router.get('/add', MyFimsRouter.addHome);


module.exports = router;