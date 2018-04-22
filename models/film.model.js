const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const schema = {
    adult: { type: Boolean, required: false},
    backdrop_path: { type: String, required: false, trim: true },
    genre_ids: [
        {
            current: { type: Number, required: false },
        }
    ],
    idapi: { type: Number, required: false, default: -1 },
    original_language: { type: String, required: false, trim: true },
    original_title: { type: String, required: false, trim: true },
    overview: { type: String, required: false, trim: true },
    popularity: { type: Number, required: false },
    poster_path: { type: String, required: false, trim: true },
    release_date: { type: String, required: false, trim: true },
    title: { type: String, required: true, trim: true },
    role: { type: String, required: true, default: "Films" },
    vote_average: { type: Number, required: false },
    vote_count: { type: Number, required: false },
    createdAt: { type: Date, required: true, default: Date.now },
    modelInfo: { type: Schema.Types.Mixed }, // con esto decimos a mongoose que guarde un campo de cualquier tipo
};


module.exports = mongoose.model('Film', schema);