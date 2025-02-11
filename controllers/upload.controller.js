const catchAsync = require('../utils/catchAsync');
const admin = require('firebase-admin');
require('dotenv').config(); 


const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
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
    const file = bucket.file(`${Date.now()}_${req.file.originalname}`);
    const fileBuffer = req.file.buffer;

    await file.save(fileBuffer, {
      contentType: req.file.mimetype, 
      metadata: {
        metadata: {
          contentType: req.file.mimetype, 
        },
      },
    });

   
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '01-01-2223',  
    });

    res.status(200).send({ url });
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error);
    res.status(500).send('Error uploading file.');
  }
});
const BulkuploadFiles = catchAsync(async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const uploadedUrls = [];  

 
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const bucket = admin.storage().bucket();
      const fileRef = bucket.file(`${Date.now()}_${file.originalname}`); 
      const fileBuffer = file.buffer;

      // Upload each file to Firebase Storage
      await fileRef.save(fileBuffer, {
        contentType: file.mimetype,
        metadata: {
          metadata: {
            contentType: file.mimetype, 
          },
        },
      });

     
      const [url] = await fileRef.getSignedUrl({
        action: 'read',
        expires: '01-01-2223',  
      });

      uploadedUrls.push(url); 
    }

    console.log({ urls: uploadedUrls })

  
    res.status(200).send({ urls: uploadedUrls });

  } catch (error) {
    console.error('Error uploading files to Firebase Storage:', error);
    res.status(500).send('Error uploading files.');
  }
});

module.exports = { uploadFile, BulkuploadFiles };
