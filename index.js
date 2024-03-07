// app.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Define a simple GET route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(8080);

console.log('My test server is running on Port 8080.');
