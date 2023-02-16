const router = require('express').Router();

// const { v4: uuidv4 } = require('uuid');

// Require the random ID generator
const uuid = require('../helpers/uuid.js');
const fs = require('fs');
const util = require('util');

const notes = require('../db/db.json');


const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
}

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.info(`\nData written to ${destination}`);
        };
    });
};



router.get('/', (req,res) => {
    // get all the notes
    // res.json(`GOT YOUR ${req.method} REQUEST}`)
    //read from db, respond with fresh data
    //const dataString = fs.readfileSync("../db/db.json", "utf-8")
    //const data = JSON.parse(dataString)
    
    const dataString = fs.readFileSync("./db/db.json", "utf-8");
    res.json(JSON.parse(dataString));

});

router.post('/', (req,res) => {

    res.json(`GOT YOUR ${req.method} REQUEST}`)

    const { title, text } = req.body;
    if (title && text) {
        const newNote ={
            title,
            text,
            id: uuid()
        };
        readAndAppend(newNote, './db/db.json');
    } else {
        console.log("ERROR: Title and text are required");
    }

    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    fs.writeFileSync('./db/db.json', JSON.stringify(currentNotes));

});

router.delete("/:id", (req,res) => {

    const dataFromDB = fs.readFileSync("./db/db.json", "utf-8");

    const dataFromJSON = JSON.parse(dataFromDB);

    const newDB = dataFromJSON.filter((note) => {
        return note.id !== req.params.id;
    });

    fs.writeFileSync("./db/db.json", JSON.stringify(newDB), (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(newDB);

    writeToFile("./db/db.json", newDB);

});

module.exports = router;