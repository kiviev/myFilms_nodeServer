const logger = require('logger');
const NotFoundError = require('errors/not-found.error')
// let Films = [
//     {
//         id: 1,
//         name: 'Paco',
//         email: 'kiviev@gmail.com',
//         role: 'ADMIN'
//     },
//     {
//         id: 2,
//         name: 'Maria',
//         email: 'maria@gmail.com',
//         role: 'Film'
//     },
//     {
//         id: 3,
//         name: 'Luis',
//         email: 'luis@gmail.com',
//         role: 'ADMIN'
//     },
//     {
//         id: 4,
//         name: 'Raquel',
//         email: 'raquel@gmail.com',
//         role: 'Film'
//     },
// ];
let Films = require('data/pelis')

class FilmService {

    static async getFilms() {
        return Films;
    }

    static async getFilmById(id) {
        // const Film = Films.find(Film => Film.id === parseInt(id));
        // console.log(Film);

        // if (!Film) {
        //     throw new NotFoundError('Film not found');
        // }
        // return Film;
    }

    static async createFilm(Film) {
        // Film.id = Film.length++;
        // Films.push(Film);
        // return Film
    }

    static async updateFilmById(id, body) {
        // let FilmModified = null;
        // for (let i = 0, length = Films.length; i < length; i++) {
        //     if (Films[i].id === id) {
        //         Films[i] = {
        //             ...Films[i],
        //             ...body
        //         }
        //         FilmModified = Films[i];
        //     }

        // }
        // if (!FilmModified) {
        //     throw new NotFoundError('Film not found')
        // }
        // return FilmModified;
    }

    static async deleteFilm(id) {
        // const Film = FilmService.getFilmsByID(id);
        // Films = Films.filter(Film => Film.id !== id);
        // return Films;
    }




}


module.exports = FilmService;