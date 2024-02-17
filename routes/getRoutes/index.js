// Import modules
const path = require('path');
const router = require('express').Router();

// Define GET request route to '/notes'
router.get('/notes', (req, res) => {
    // Respond to the client by sending the 'notes.html' file
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Define GET request route to root page
router.get('/', (req, res) => {
    // Respond to the client by sending the 'index.html' file
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Define catch-all route that handles all other GET requests
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;