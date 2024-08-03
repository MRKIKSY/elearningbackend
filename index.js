// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./routes'); // Adjust as needed

dotenv.config();

console.log('Mongo URI:', process.env.MONGO_URI);
console.log('Port:', process.env.PORT);

const app = express();

// Middleware
app.use(cors({
  origin: 'https://jobmarketfrontend.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Allow cookies and other credentials
}));


app.use(express.json()); // Ensure this is before your routes

// Routes
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
