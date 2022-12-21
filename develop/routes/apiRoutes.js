const router = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const util = require('util');

const notes = require('../db/db.json');

router.get('/', (req,res) => {
    // get all the notes
    // res.json(`GOT YOUR ${req.method} REQUEST}`)
//read from db, respond with fresh data
//const dataString = fs.readfileSync("../db/db.json", "utf-8")
//const data = JSON.parse(dataString)
    res.json(notes)


})

router.post('/', (req,res) => {
    res.json(`GOT YOUR ${req.method} REQUEST}`)
    console.log(req.body)
    notes.push(req.body);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
}
)

module.exports = router;