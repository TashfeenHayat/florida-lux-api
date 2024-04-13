const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const inquiryValidation = require('../../validations/inquiry.validation');
const inquiryController = require('../../controllers/inquiry.controller');

const router = express.Router();

router
  .route('/')
    .post(validate(inquiryValidation.createInquiry), inquiryController.createInquiry)
    .get(auth(), inquiryController.getInquiries);

router
  .route('/:id')
    .get(auth(), inquiryController.getInquiry)

module.exports = router;