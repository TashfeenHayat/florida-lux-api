const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const propertyValidation = require('../../validations/property.validation');
const propertyController = require('../../controllers/property.controller');

const router = express.Router();

router
.route('/')
  .post(auth(), validate(propertyValidation.createProperty), propertyController.createProperty)
  .get(propertyController.getProperties);

router
  .route('/:id')
    .patch(auth(), validate(propertyValidation.updateProperty), propertyController.updateProperty)
    .get(propertyController.getProperty)
    .delete(auth(), propertyController.deleteProperty);
    

module.exports = router;
