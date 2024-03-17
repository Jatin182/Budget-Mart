const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB without the deprecated options
mongoose.connect('mongodb://localhost:27017/aboutDB');

// Define a schema for the data you want to save
const aboutSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create a model based on the schema
const About = mongoose.model('About', aboutSchema);

// Serve your HTML and static assets
app.use(express.static('public'));

// POST route to handle form submission
app.post('/submit-about-form', (req, res) => {
  const newAbout = new About({
    name: req.body.name,
    email: req.body.email
  });

  newAbout.save()
    .then(() => res.send('Data saved successfully'))
    .catch(err => res.status(500).send(err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
