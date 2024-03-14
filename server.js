const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost:27017/contactDB');

app.use(express.static('public'));

// Define a schema for the contact form
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle POST request
app.post('/submit-contact-form', (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  // Use .then() and .catch() for handling promise returned by save()
  newContact.save()
    .then(() => res.send('Successfully saved contact information.'))
    .catch(err => res.send(err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
