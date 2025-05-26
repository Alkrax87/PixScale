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

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'about.html'));
});

app.post('/upload', upload.array('images'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('/message.html?status=empty')
  }

  // Save image's names
  const processedNames = [];

  // Get options to convert
  const format = req.body.format;
  // TODO const aspectRatio = req.body.aspectRatio;
  const objectFit = req.body.objectFit;
  const sizeOptions = req.body.sizeOptions;
  const width = parseInt(req.body.width);
  const height = parseInt(req.body.height);
  const quality = parseInt(req.body.quality);
  const optimizeMetadata = req.body.optimizeMetadata === 'on';

  // Proccess iamges
  for (const file of req.files) {
    const inputPath = file.path;
    const outputName = `${path.parse(file.originalname).name}.${format}`;
    const outputPath = path.join('processed', outputName);

    try {
      let image;
      if (sizeOptions === 'custom-size') {
        image = sharp(inputPath).resize({ width: width, height: height, fit: objectFit });
      } else {
        image = sharp(inputPath);
      }

      if (optimizeMetadata) {
        image = image.withMetadata();
      }

      switch (format) {
        case 'webp':
          await image.webp({ quality: quality }).toFile(outputPath);
          break;
        case 'png':
          await image.png({ quality: quality }).toFile(outputPath);
          break;
        case 'jpeg':
          await image.jpeg({ quality: quality }).toFile(outputPath);
          break;
        case 'avif':
          await image.avif({ quality: quality }).toFile(outputPath);
          break;
        case 'tiff':
          await image.tiff({ quality: quality }).toFile(outputPath);
          break;
        default:
          throw new Error(`Format not supported: ${format}`);
      }

      processedNames.push(outputName);
      fs.unlinkSync(inputPath);
    } catch (error) {
      console.log(`Error processing ${file.originalname}: `, error);
    }
  }

//  res.sendFile(path.join(__dirname, '../public', 'converted.html'));
  res.redirect('/message.html?status=success')
});

module.exports = app;