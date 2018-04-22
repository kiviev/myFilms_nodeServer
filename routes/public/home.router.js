// const fs = require('fs');
const stream = require('services/stream.reader.service');
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
        await ctx.render('index', { users });
    }



}



router.get('/', HomeRouter.getHome);


module.exports = router;