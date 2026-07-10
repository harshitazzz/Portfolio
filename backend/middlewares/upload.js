const multer = require('multer');

// Store the uploaded file in memory (as a buffer) instead of writing to local
// disk. Vercel's serverless functions have a read-only filesystem (except
// /tmp, which isn't shared or persistent between invocations), so writing to
// a local "uploads" folder does not work in production. The buffer is
// uploaded to Cloudinary instead (see config/cloudinary.js).
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif|webp|pdf|webm|mp4/;
  const path = require('path');
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype) || file.mimetype.startsWith('video/');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images, PDFs, and Videos only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
