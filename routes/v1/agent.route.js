const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const agentValidation = require('../../validations/agent.validation');
const agentController = require('../../controllers/agent.controller');

const router = express.Router();

router
.route('/')
  .post(auth(), validate(agentValidation.createAgent), agentController.createAgent)
  .get(auth(), validate(agentValidation.getAllAgent), agentController.getAllAgents);



module.exports = router;