const router = require('express').Router();
const authService = require('../services/authServices');

const errorUtils = require('../utils/erroUtils');

router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    
    try {
        await authService.register(userData);
        res.redirect('/');
        
    } catch (err) {
        const message = errorUtils.getErrorMessage(err)
        res.render('auth/register', {error: message});
    }
    
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token, { httpOnly: true });

    const user = req.user;

    res.redirect('/');
});

router.get('/logout', (req,res)=>{
    res.clearCookie('auth');
    res.redirect('/')
});



module.exports = router;