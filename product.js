const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// BodyParser Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB without the deprecated options
mongoose.connect('mongodb://localhost:27017/budgetMartDB');

// MongoDB schema and model for the order
const orderSchema = new mongoose.Schema({
  productName: String,
  address: String,
  quantity: Number,
});

const Order = mongoose.model('Order', orderSchema);

// Route to handle form submission from the product page
app.post('/submit-order', (req, res) => {
  const newOrder = new Order({
    productName: req.body.productName, // Assuming input name is 'productName'
    address: req.body.address, // Assuming textarea name is 'address'
    quantity: req.body.quantity, // Assuming input name is 'quantity'
  });

  newOrder.save()
    .then(() => res.send('Order saved successfully'))
    .catch(err => res.status(500).send('Error saving order: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
