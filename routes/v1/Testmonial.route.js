
const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const TestmonialValidation = require("../../validations/Testmonial.validation");
const TestmonialController = require("../../controllers/Testmonial.controller");

const router = express.Router();

router
    .route("/")
    .post(auth(), validate(TestmonialValidation.createTestmonial), TestmonialController.createTestmonial)
    .get(TestmonialController.getAllTestmonials);

router
    .route("/:id")
    .patch(auth(), TestmonialController.updateTestmonial)
    .get(TestmonialController.getTestmonial)
    .delete(auth(), TestmonialController.deleteTestmonial);

module.exports = router;
