const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const schema = {
    adult: { type: Boolean, required: false},
    backdrop_path: { type: String, required: false, trim: true },
    genre: [
        {
            id: { type: Number, required: false },
            name: { type: String, required: false,trim: true },
        }
    ],
    idapi: { type: Number, required: false, default: -1, unique: true },
    imdb_id: { type: String, required: false, trim: true },
    original_language: { type: String, required: false, trim: true },
    original_title: { type: String, required: false, trim: true },
    overview: { type: String, required: false, trim: true },
    popularity: { type: Number, required: false },
    poster_path: { type: String, required: false, trim: true },
    production_companies: [
        {
            id: { type: Number, required: false },
            logo_path: { type: String, required: false, trim: true },
            name: { type: String, required: false, trim: true },
            origin_country: { type: String, required: false, trim: true },
        }
    ],
    release_date: { type: String, required: false, trim: true },
    title: { type: String, required: true, trim: true },
    video: { type: Boolean, required: false},
    role: { type: String, required: true, default: "Films" },
    vote_average: { type: Number, required: false },
    vote_count: { type: Number, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
    videos: {
        results: [
            {
                id: { type: Number, required: false },
                iso_639_1: { type: String, required: false, trim: true },
                key: { type: String, required: false, trim: true },
                name: { type: String, required: false, trim: true },
                site: { type: String, required: false, trim: true },
                size: { type: Number, required: false },
                type: { type: String, required: false, trim: true },
            }
        ]
    },
    local : {
        filename: { type: String, required: true, trim: true },
        filetype: { type: String, required: true, trim: true },
        src: { type: String, required: true, trim: true },
    },
    modelInfo: { type: Schema.Types.Mixed }, // con esto decimos a mongoose que guarde un campo de cualquier tipo
};


module.exports = mongoose.model('Film', schema);