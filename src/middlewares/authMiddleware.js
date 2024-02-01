const jwt = require('../lib/jwt')

const { SECRET } = require('../utils/constants');

const auth = async function (req, res, next) {

    const token = req.cookies['auth'];

    if (token) {

        try {
            const user = await jwt.verify(token, SECRET);
            req.user = user;
            res.locals.user = user;
            res.locals.isAuth = true;
            next();
        } catch (error) {
            res.clearCookie('auth');
            res.redirect('/auth/login');
        }
    } else {
        next();
    }

}

const isAuth = function (req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
       return res.redirect('/auth/login');
    }

    next();
}

module.exports = { auth, isAuth };