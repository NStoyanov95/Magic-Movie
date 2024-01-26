const Movie = require('../models/Movie');

const movies = [];

exports.create = (movieData) => Movie.create(movieData)

exports.getAll = () => Movie.find();

exports.getOne = (id) => Movie.findById(id);


exports.search = async (title, genre, year) => {
    let allMovies = this.getAll();

    if (title) {
        allMovies = await allMovies.find({ title }).lean();
    };

    if (genre) {
        allMovies = await allMovies.find({ genre }).lean();
    };

    if (year) {
        allMovies = await allMovies.find({ year }).lean();
    };

    return allMovies;
}

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);
    movie.casts.push(castId);
    movie.save();
}