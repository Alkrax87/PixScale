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

const upload = multer({ dest: './uploads/' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.post('/upload', upload.array('images', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No images were uploaded.');
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

  const htmlList = processedNames.map(name => `<l1>${name}</li>`).join('');

  res.send(`
    <h2>¡Imágenes recibidas!</h2>
    <ul>${htmlList}</ul>
    <a href="/">Volver</a>
  `)
});

module.exports = app;