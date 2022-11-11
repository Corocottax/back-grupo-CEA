const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    director: { type: String, trim: true, required: false },
    year: {type: Number, trim: true, required: false},
    image: { type: String, trim: true, required: true },
    genre: {type: String, trim: true},
    description: { type: String, trim: true, required: false },
}, { timestamps: true, collection: 'movies'})

const Movie = mongoose.model('movies', movieSchema)
module.exports = Movie