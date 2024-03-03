const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();

// Middleware to serve static files from the 'public' directory - will serve index.html on load by default
app.use(express.static('public'));

// Load index.html
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, "/public/index.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${filePath}`, err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Path to notes.html
app.get('/notes', (req, res) => {
    const filePath = path.join(__dirname, "/public/notes.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${filePath}`, err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Catch-all/wildcard for routes that have not been explicitly defined
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, "/public/index.html");
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${filePath}`, err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Listen
app.listen(port, () =>
    console.log(`Server is listening at http://localhost:${port}`)
);