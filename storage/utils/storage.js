const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});
const upload = multer({ storage });
module.exports.dynamicUpload = (req, res, next) => {
    const fieldName = req.headers.types;
    upload.single(fieldName)(req, res, next);
};
