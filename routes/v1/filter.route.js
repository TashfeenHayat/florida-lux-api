const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const agentValidation = require('../../validations/agent.validation');
const filterController = require('../../controllers/filter.controller');

const router = express.Router();

router
  .route('/:key?')
    .post(auth(), validate(agentValidation.createAgent), filterController.createFilter)
    .get( filterController.getAllFilters);

router
  .route('/:id')
    .patch(auth(), filterController.updateFilter)
    .get(auth(), filterController.getFilter);

module.exports = router;