const notes = require('express').Router();
const fs = require('fs');
const jsonPath = './db/db.json';
const newSequentialId = require('../utils/id.js');

// Display Notes
notes.get("/notes", (req, res) => {
    fs.readFile(jsonPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading notes', err);
            return res.status(500).json({ message: 'Request to read notes failed' });
        };

        const notesArray = JSON.parse(data);
        res.json(notesArray);
    });
});

// Post New Note
notes.post('/notes', (req,res) => {
    fs.readFile(jsonPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading notes', err);
            return res.status(500).json({ message: 'Request to read notes failed' });
        };

        const notesArray = JSON.parse(data);

        // Creating a new note
        const newNote = {
            id: newSequentialId(notesArray),
            title: req.body.title,
            text: req.body.text
        };

        notesArray.push(newNote);

        // Write updated db.json file
        fs.writeFile(jsonPath, JSON.stringify(notesArray, null, 2), 'utf-8', (writeFileErr) => {
            if (writeFileErr) {
                console.error('Unable to post note', writeFileErr);
                return res.status(500).json({ message: 'Request to post note failed' });
            };

            // Respond with a new note
            res.json(newNote);
        });
    });
});

// Delete Existing Note
notes.delete('/notes/:id', (req, res) => {
    fs.readFile(jsonPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading notes', err);
            return res.status(500).json({ message: 'Request to read notes failed' });
        };

        const notesArray = JSON.parse(data);
        const deleteId = Number(req.params.id); // Define note id to be deleted as a number
        const index = notesArray.findIndex(note => note.id === deleteId); // Use findIndex to find note id to be deleted

        // If note id to be deleted exists (findIndex returns -1 if id not found)
        if(index !== -1) {
            // Remove the note from db.json
            notesArray.splice(index, 1);

            // Rewrite the notes with the requested note removed from db.json
            fs.writeFile(jsonPath, JSON.stringify(notesArray, null, 2), (writeFileErr) => {
                if (writeFileErr) {
                    console.error('Unable to delete note', writeFileErr)
                    return res.status(500).json({ error: 'Request to delete note failed' });
                } else {
                    console.log('Deleted note #' + deleteId + ' successfully');
                    return res.status(200).json({ message: 'Note deleted successfully' });
                };
            });
        } else {
            // Returns if note is not found
            return res.status(404).json({ error: 'Note not found', details: 'Note with the specified ID was not found' });
        };
    });
});

module.exports = notes;