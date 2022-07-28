const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../dist'),
  filename: (req, file, next) => {
    next(null, uuidv4() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage,
  dest: path.join(__dirname, '../dist'),
  limits: { fileSize: 20000000 },
  fileFilter: (req, file, next) => {
    const types = /jpg|jpeg|png|gif/;
    const mimetype = types.test(file.mimetype);
    const extname = types.test(path.extname(file.originalname));
    if (mimetype && extname) next(null, true);
    next('error to upload image with multer');
  },
}).single('image');
