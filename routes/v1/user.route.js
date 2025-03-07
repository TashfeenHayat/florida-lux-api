const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/register')
  .post(validate(userValidation.createUser), userController.createUser);

router.route('/login').post(userController.loginUser);

router.route('/profile').get(auth(), userController.getUser);
router.route('/logout').post(userController.logoutUser);
router
  .route('/')
  .get(validate(userValidation.createUser), userController.createUser);  

// router
//   .route('/:userId')
//   .get(auth('user'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('user'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('user'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
