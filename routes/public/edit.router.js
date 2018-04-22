// const fs = require('fs');
const stream = require('services/stream.reader.service');
const KoaRouter = require('koa-router');
const logger = require('logger.js')
// const HomeService = require('services/home.service');
const configApp = require('config/config');

const router = new KoaRouter({
    prefix:'/edit'
});

class EditRouter {


    static async getHome(ctx) {
        logger.info('[ROUTER] Get Home Edit');
        let users = [{nombre:'juan'}]
        await ctx.render('edit', { users });
    }



}



router.get('/', EditRouter.getHome);


module.exports = router;