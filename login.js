const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Updated MongoDB connection without deprecated options
mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema({
    email: String,
    password: String // Note: In a real-world application, ensure passwords are hashed for security.
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit-register', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering new user.");
        } else {
            console.log("User registered successfully.");
            res.redirect('/log-in.html'); // Ensure you have a log-in.html page to redirect to
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
