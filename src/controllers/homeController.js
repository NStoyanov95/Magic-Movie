const router = require('express').Router();

const movieService = require('../services/movieService');

router.get('/', async (req, res) => {
    const movie = await movieService.getAll().lean();

    res.render('home/home', { movie });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});

router.get('/404', (req, res) => {
    res.render('home/404');
});

module.exports = router;