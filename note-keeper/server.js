const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const notesFile = path.join(__dirname, 'data', 'notes.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
// Get all notes
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesFile));
    res.json(notes);
});

// Add a new note
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(notesFile));
    const newNote = { id: Date.now(), text: req.body.text };
    notes.push(newNote);
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
    res.json(newNote);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync(notesFile));
    notes = notes.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
    res.sendStatus(204);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
