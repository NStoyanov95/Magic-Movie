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
    movieData.owner = req.user._id;
    await movieService.create(movieData);
    res.redirect('/');
});

router.get('/:id/details', async (req, res) => {
    const id = req.params.id;
    const movie = await movieService.getOne(id).lean().populate('casts');
    res.render('movie/details', { movie });
});

router.get('/:id/edit', async (req, res) => {
    const movie = await movieService.getOne(req.params.id).lean();

    res.render('movie/edit', { movie });
});

router.post('/:id/edit', async (req, res) => {
    const movieData = req.body;

    await movieService.edit(req.params.id, movieData);

    res.redirect(`/movie/${req.params.id}/details`);
});

router.get('/:id/delete', async (req, res) => {
    await movieService.delete(req.params.id);

    res.redirect('/')
})

module.exports = router;