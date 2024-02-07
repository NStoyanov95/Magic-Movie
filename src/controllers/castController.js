const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

const castService = require('../services/castService');
const movieService = require('../services/movieService');

const errorUtils = require('../utils/erroUtils');

router.get('/attach/:id', isAuth, async (req, res) => {

    try {
        const movie = await movieService.getOne(req.params.id).lean();
        const casts = await castService.getAll().lean();
        res.render('cast/attach', { movie, casts });

    } catch (error) {
        res.redirect('404')
    }
});

router.post('/attach/:id', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.id;

    try {
        await movieService.attach(movieId, castId);
        res.redirect(`/movie/${movieId}/details`);
    } catch (error) {
        const message = errorUtils.getErrorMessage(error);
        res.render('cast/attach', { error: message });
    }
});

router.get('/create', isAuth, (req, res) => {
    res.render('cast/create');
});

router.post('/create', async (req, res) => {
    const castData = req.body;

    try {
        await castService.create(castData);
        res.redirect('/');
    } catch (error) {
        const message = errorUtils.getErrorMessage(error);
        res.render('cast/create', { error: message })
    }
});

module.exports = router;