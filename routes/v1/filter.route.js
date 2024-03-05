const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router
.route('/')
  .post(validate(roleValidation.createRole), auth(), roleController.createRole)
  .get(auth(), roleController.getRoles);



module.exports = router;