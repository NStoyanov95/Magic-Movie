const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const movieService = require('../services/movieService');

router.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

router.get('/search', async (req, res) => {
    const movies = await movieService.getAll().lean();
    res.render('movie/search', { movies });

});

router.post('/search', async (req, res) => {
    const { title, genre, year } = req.body;
    const movies = await movieService.search(title, genre, year);
    res.render('movie/search', { movies })
});

router.post('/create', async (req, res) => {
    const movieData = req.body;
    await movieService.create(movieData);
    res.redirect('/');
});

router.get('/:id/details',isAuth, async (req, res) => {
    const id = req.params.id;
    const movie = await movieService.getOne(id).lean().populate('casts');
    res.render('movie/details', { movie });
});


module.exports = router;