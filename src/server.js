const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/TestDB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema and model
const testDataSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const TestData = mongoose.model('TestData', testDataSchema);

// API endpoint to get all documents in TestData collection
app.get('/api/testdata', async (req, res) => {
  try {
    const data = await TestData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
