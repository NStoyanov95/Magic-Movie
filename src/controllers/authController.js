const router = require('express').Router();
const authService = require('../services/authServices');

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    authService.register(userData);

    res.redirect('/');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});



module.exports = router;