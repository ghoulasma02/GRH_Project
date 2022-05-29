const multer = require('multer');
const path= require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf':'pdf',
  'application/msword':'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xls'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'fichier');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');