const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const reportController = require("../../controllers/report.controller");
const reportValidation = require("../../validations/report.validation");

const router = express.Router();

router
    .route("/")
    .post(
        auth(),
        validate(reportValidation.createReport),
        reportController.createReport
    )

    .get(reportController.getAllReports);
console.log("POST /v1/report");
router
    .route("/:id")
    .patch(
        auth(),
        validate(reportValidation.createReport),
        reportController.updateReport
    )
    .get(reportController.getReport)
    .delete(auth(), reportController.deleteReport);
module.exports = router;
