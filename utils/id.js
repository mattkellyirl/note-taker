// Generates a new sequential ID for each new note
const newSequentialId = (notes) => {

    // Check for existing notes, if notes are empty id = 1
    if(notes.length === 0) {
        return 1;
    };

    // If notes is not empty, find the max number of notes saved and set id to max number of notes +1
    const maxId = Math.max(...notes.map(note => parseInt (note.id, 10)));
    return maxId + 1;
};

// Export function (called from notes.post in notes.js)
module.exports = newSequentialId;