// Import dependencies
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

// Promisify the 'readFile' and 'writeFile' functions from the 'fs' module
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

// Create class called 'Save' to handle reading and writing notes
class Save {
    // Writes note to JSON file
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    // Reads note from JSON file
    read() {
        return readNote('db/db.json', 'utf8');
    }

    // Collects and parses note from file
    obtainNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    // Adds new note to file
    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Both title and text cannot be blank');
        }
        const newNote = { title, text, id: uuidv4() }; // Generates unique ID for new note

        return this.obtainNotes()
            .then(notes => [...notes, newNote]) // Adds new note to existing ones
            .then(updatedNotes => this.write(updatedNotes)) // Writes updated notes to file
            .then(() => newNote); // Returns newly added note
    }

    // Bonus: Deletes note with specific ID from file
    deleteNote(id) {
        return this.obtainNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

// Exports instance of 'Save' class to use in other parts of the application
module.exports = new Save();