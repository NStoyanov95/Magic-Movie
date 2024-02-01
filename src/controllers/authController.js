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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token, { httpOnly: true });
    
    const user = req.user

    console.log(user);

    res.redirect('/');
})



module.exports = router;