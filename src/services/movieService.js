const Movie = require('../models/Movie');

const movies = [];

exports.create = (movieData) => Movie.create(movieData)

exports.getAll = () => Movie.find();

exports.getOne = (id) => {
    const movie = Movie.findById(id);
    return movie
}

exports.search = (title, genre, year) => {
    let allMovies = this.getAll();

    if (title) {
        allMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
    };

    if (genre) {
        allMovies = allMovies.filter(movie => movie.genre == genre);
    };

    if (year) {
        allMovies = allMovies.filter(movie => movie.year == year);
    };

    return allMovies;
}