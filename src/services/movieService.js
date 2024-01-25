const movies = [];

exports.create = (movieData) => {
    movies.push(movieData);
};

exports.getAll = () => {
    const allMovies = movies.slice();
    return allMovies;
};

exports.getOne = (id) => {
    const movie = movies.find(movie => movie.id == id);
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