const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const movieService = require('../services/movieService');

const errorUtils = require('../utils/erroUtils');

router.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

router.post('/create', async (req, res) => {
    const movieData = req.body;
    movieData.owner = req.user._id;
    try {
        await movieService.create(movieData);
        res.redirect('/');

    } catch (error) {
        message = errorUtils.getErrorMessage(error);
        res.render('movie/create', { error: message })
    }
});

router.get('/search', async (req, res) => {
    try {
        const movies = await movieService.getAll().lean();
        res.render('movie/search', { movies });
    } catch (error) {
        res.redirect('/404');
    }

});

router.post('/search', async (req, res) => {
    const { title, genre, year } = req.body;
    const movies = await movieService.search(title, genre, year);
    res.render('movie/search', { movies })
});


router.get('/:id/details', async (req, res) => {

    try {
        const movie = await movieService.getOne(req.params.id).lean().populate('casts');
        const casts = movie.casts.length > 0;
        const isOwner = req.user?._id == movie.owner?._id;
        res.render('movie/details', { movie, isOwner, casts });
        
    } catch (error) {
        const message = errorUtils.getErrorMessage(error);
        res.render('movie/404', {error: message})
    }
});

router.get('/:id/edit', async (req, res) => {
    try {
        const movie = await movieService.getOne(req.params.id).lean();
        res.render('movie/edit', { movie });
        
    } catch (error) {
        res.redirect('/404');
    }
});

router.post('/:id/edit', async (req, res) => {
    const movieData = req.body;

    await movieService.edit(req.params.id, movieData);

    res.redirect(`/movie/${req.params.id}/details`);
});

router.get('/:id/delete', async (req, res) => {
    try {
        await movieService.delete(req.params.id);
        res.redirect('/')
        
    } catch (error) {
        res.redirect('/404')
    }
})

module.exports = router;