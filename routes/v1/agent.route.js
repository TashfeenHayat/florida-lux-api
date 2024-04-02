const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const agentValidation = require('../../validations/agent.validation');
const agentController = require('../../controllers/agent.controller');

const router = express.Router();

router
  .route('/')
    .post(auth(), validate(agentValidation.createAgent), agentController.createAgent)
    .get( agentController.getAllAgents);

router
  .route('/:id')
    .patch(auth(), agentController.updateAgent)
    .get(auth(), agentController.getAgent)
    .delete(auth(), agentController.deleteAgent);

module.exports = router;