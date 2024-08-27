const express = require('express');
const multer = require('multer');

const auth = require('../../middlewares/auth');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

// Set up multer for file uploads using memory storage
const storage = multer.memoryStorage(); // Use memory storage for multer

const upload = multer({ storage });

router.route('/')
    .post(auth(), upload.single('file'), uploadController.uploadFile);

module.exports = router;
