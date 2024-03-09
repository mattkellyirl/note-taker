const notes = require('express').Router();
const fs = require('fs');
const jsonPath = ('./db/db.json');
const newSequentialId = require('../utils/id.js');

// Display Notes
notes.get("/notes", (req, res) => {
    fs.readFile(jsonPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error Reading Notes', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        };

        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// Post a New Note
notes.post('/notes', (req,res) => {
    fs.readFile(jsonPath, 'utf-8', (postErr, data) => {
        if (postErr) {
            console.error('Error Posting Note', postErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        };

        const notes = JSON.parse(data);
        
        // Creating a new note
        const newNote = {
            id: newSequentialId(notes),
            title: req.body.title,
            text: req.body.text
        };

        notes.push(newNote);

        // Writing the updated db.json file
        fs.writeFile(jsonPath, JSON.stringify(notes, null, 2), 'utf-8', (writeErr) => {
            if (writeErr) {
                console.error('Error Writing Note', writeErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            };

            // Respond with new note
            res.json(newNote);
        });
    });
});

module.exports = notes;