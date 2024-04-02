const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const filterValidation = require('../../validations/filter.validation');
const filterController = require('../../controllers/filter.controller');

const router = express.Router();

router
  .route('/')
    .post(auth(), validate(filterValidation.createAgent), filterController.createFilter)
    .get( filterController.getAllFilters);

router
  .route('/:id')
    .patch(auth(), filterController.updateFilter)
    .get(filterController.getFilter)
    .delete(filterController.deleteFilter);

module.exports = router;