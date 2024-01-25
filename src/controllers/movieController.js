const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('movie/create');
});

router.get('/search', (req, res) => {
    const { title, genre, year } = req.query;
    const movies = movieService.search(title, genre, year);

    res.render('search', { movies })
});

router.post('/create', async (req, res) => {
    const movieData = req.body;
    await movieService.create(movieData);
    res.redirect('/');
});

router.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const movie = await movieService.getOne(id).lean().populate('casts');
    console.log(movie);
    res.render('movie/details', { movie });
});


module.exports = router;