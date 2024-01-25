const router = require('express').Router();

router.get('/attach/:id', (req, res) => {
    res.render('cast/attach');
})

module.exports = router;