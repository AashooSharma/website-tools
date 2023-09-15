const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Load existing users from the JSON file
    const users = JSON.parse(fs.readFileSync('users.json'));

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.send('Login successful!');
    } else {
        res.send('Login failed. Please check your username and password.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
