const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = require('./src/app');

// Enable CORS for all requests or for specific frontend URL
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests only from the frontend
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow headers
};

app.use(cors(corsOptions)); // Apply CORS middleware to your app

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});