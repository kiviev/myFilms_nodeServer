const logger = require('logger');
const NotFoundError = require('errors/not-found.error');

// const fs = require('fs');
// const path = require('path');
// const readFileThunk = function (src) {
//     return new Promise(function (resolve, reject) {
//         fs.readFile(src, { 'encoding': 'utf8' }, function (err, data) {
//             if (err) return reject(err);
//             resolve(data);
//         });
//     });
// }

class HomeService {

    static async getHome() {
        // return Home.filter(Film => role.includes(Film.role));
        // return readFileThunk(path.join(process.env.NODE_PATH +'/public/index.html'));
        logger.info('[HOME_SERVICE] getHome')
       
        return '/public/index.html';
    }
// app.use(mount('/', serve('public', { extensions: ['.html'] })));
// app.use(mount('/assets', serve('/node_modules/jquery/dist/')));
// app.use(mount('/assets', serve('/node_modules/video.js/dist/')));
// app.use(mount('/assets', serve('/node_modules/bootstrap/dist/css/bootstrap.min.css')));
// app.use(mount('/assets', serve('/node_modules/bootstrap/dist/js')));


}


module.exports = HomeService;