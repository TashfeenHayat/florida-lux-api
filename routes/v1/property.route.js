const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const propertyValidation = require('../../validations/property.validation');
const propertyController = require('../../controllers/property.controller');

const router = express.Router();

router
.route('/')
  .post(auth(), validate(propertyValidation.createProperty), propertyController.createProperty)
  .get(auth(), propertyController.getProperties);

router
  .route('/:id')
    .patch(auth(), propertyController.updateProperty)
    .get(auth(), propertyController.getProperty);

module.exports = router;
