const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const pressController = require("../../controllers/press.controller");
const pressValidation = require("../../validations/press.validation");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(pressValidation.createPost),
    pressController.createPost
  )
  .get(pressController.getAllPosts);

router
  .route("/:id")
  .patch(
    auth(),
    validate(pressValidation.createPost),
    pressController.updatePost
  )
  .get(pressController.getPost)
  .delete(auth(), pressController.deletePost);
module.exports = router;
