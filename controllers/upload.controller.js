const catchAsync = require('../utils/catchAsync');
const admin = require('firebase-admin');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Firebase Admin SDK using environment variables
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Replace escaped newlines with actual newlines
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Upload file handler using async wrapper `catchAsync`
const uploadFile = catchAsync(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Upload file to Firebase Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(`${Date.now()}_${req.file.originalname}`); // Use timestamp to avoid file name conflicts
    const fileBuffer = req.file.buffer;

    await file.save(fileBuffer, {
      contentType: req.file.mimetype, // Dynamically set content type based on file type
      metadata: {
        metadata: {
          contentType: req.file.mimetype, // Dynamic content type for different file types
        },
      },
    });

    // Get the publicly accessible URL of the uploaded file
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '01-01-2223',  // The expiration date can be adjusted
    });

    res.status(200).send({ url });
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error);
    res.status(500).send('Error uploading file.');
  }
});

// Export the uploadFile function to use it in routes
module.exports = { uploadFile };
