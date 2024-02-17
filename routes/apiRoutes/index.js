// Set dependencies
const router = require('express').Router();
const recordInfo = require('../../db/recordInfo');

// Set GET request
router.get('/notes', function (req, res) {
    recordInfo
        .obtainNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

// Set POST request
router.post('/notes', (req, res) => {
    recordInfo
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

// Bonus: Set DELETE request
router.delete('/notes/:id', function (req, res) {
    recordInfo
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});


module.exports = router;