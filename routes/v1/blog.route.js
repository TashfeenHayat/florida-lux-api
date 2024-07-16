const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const blogValidation = require("../../validations/blog.validation");
const blogController = require("../../controllers/blog.controller");

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(blogValidation.createBlog), blogController.createBlog)
  .get(blogController.getAllBlogs);

router
  .route("/:id")
  .patch(auth(), blogController.updateBlog)
  .get(blogController.getBlog)
  .delete(auth(), blogController.deleteBlog);

module.exports = router;
