const jwt = require('../lib/jwt')

const { SECRET } = require('../utils/constants');

const auth = async function (req, res, next) {

    const token = req.cookies['auth'];

    if (token) {
        
        try {
            const user = await jwt.verify(token, SECRET);
            req.user = user;
            const isAuth = true;
            next();
        } catch (error) {
            res.clearCookie('auth');
            res.redirect('/');
        }
    }else{
        next();
    }


}

module.exports = auth;