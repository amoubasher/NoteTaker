const router = require('express').Router();

router.get('/', (req,res) => {
    // get all the notes
    res.json(`GOT YOUR ${req.method} REQUEST}`)
})

router.post('/', (req,res) => {
    res.json(`GOT YOUR ${req.method} REQUEST}`)
})

module.exports = router;