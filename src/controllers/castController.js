const router = require('express').Router();

router.get('/attach/:id', (req, res) => {
    res.render('cast/attach');
})

router.get('/create', (req,res)=>{
    res.render('cast/create');
});

module.exports = router;