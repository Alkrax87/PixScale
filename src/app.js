const express = require('express');
const morgan = require('morgan');
const path = require('path');

app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;