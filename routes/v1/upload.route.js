const express = require('express');
const multer = require('multer');

const auth = require('../../middlewares/auth');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
}); // Use memory storage for multer

const upload = multer({ storage });

router
.route('/')
  .post(auth(), upload.single('file'), uploadController.uploadFile)



module.exports = router;
