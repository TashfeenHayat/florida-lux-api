const catchAsync = require('../utils/catchAsync');
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-adminsdk-jsht2-f7a528f706.json'); // Path to your Firebase service account key file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'yahyanbilal.appspot.com' // Replace with your storage bucket URL
});

const uploadFile = catchAsync(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Upload file to Firebase Storage
    const bucket = admin.storage().bucket();
    const file = bucket.file(`${Date.now() + req.file.originalname}`);
    const fileBuffer = req.file.buffer;

    await file.save(fileBuffer, {
      contentType: req.file.mimetype,
      metadata: {
        metadata: {
          // Add any additional metadata here
          contentType: 'image/jpeg', // Specify the content type of the file
          // Set ACL to make the file publicly accessible
          acl: [
            {
              entity: 'allUsers',
              role: 'READER'
            }
          ]
        }
      }
    });
    // Get the publicly accessible URL of the uploaded file
    const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2223' });
    res.status(200).send({ url });
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error);
    res.status(500).send('Error uploading file.');
  }
});

module.exports = { uploadFile }