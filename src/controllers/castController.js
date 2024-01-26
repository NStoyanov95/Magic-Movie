const router = require('express').Router();

const castService = require('../services/castService');
const movieService = require('../services/movieService');

router.get('/attach/:id', async (req, res) => {
    const movie = await movieService.getOne(req.params.id).lean();
    const casts = await castService.getAll().lean();

    res.render('cast/attach', { movie, casts });
});

router.post('/attach/:id', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.id;

    await movieService.attach(movieId, castId);
    res.redirect(`/movie/${movieId}/details`);
});

router.get('/create', (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;

    await castService.create(castData);

    res.redirect('/')
});

module.exports = router;