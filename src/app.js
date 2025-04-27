const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/processed', express.static(path.join(__dirname, '../processed')));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("dev"));

if (!fs.existsSync('./processed')) {
  fs.mkdirSync('./processed')
}

// Middleware to handle file uploads
const upload = multer({ dest: './uploads/' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post('/upload', upload.array('images'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.sendFile(path.join(__dirname, '../public', 'empty.html'));
  }

  const processedNames = [];

  // Proccess iamges
  for (const file of req.files) {
    const inputPath = file.path;
    const outputName = `${path.parse(file.originalname).name}.webp`;
    const outputPath = path.join('processed', outputName);

    try {
      await sharp(inputPath)
        .webp({ quality: 75 })
        .toFile(outputPath);

      processedNames.push(outputName);

      fs.unlinkSync(inputPath);
    } catch (error) {
      console.log(`Error processing ${file.originalname}: `, error);
    }

  }

  res.sendFile(path.join(__dirname, '../public', 'converted.html'));
});

module.exports = app;