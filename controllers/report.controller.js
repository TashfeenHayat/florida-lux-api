const catchAsync = require("../utils/catchAsync");
const { Report } = require("../models");

const createReport = catchAsync(async (req, res) => {
    console.log("try to create a report")
    const { permissions } = req.user.roleId;
    const all = permissions.find((i) => i.module === "all");

    if (all) {
        await Report.create(req.body);

        return res.status(200).send("Report created successfully");
    } else {
        return res.status(403).send("Forbiden! You are not allowed");
    }
});

const getReport = catchAsync(async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).exec();

        return res.status(200).send(report);
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(404).json("No filter foud");
    }
});

const updateReport = catchAsync(async (req, res) => {
    const { permissions } = req.user.roleId;
    const all = permissions.find((i) => i.module === "all");

    if (all) {
        await Report.findByIdAndUpdate(req.params.id, req.body);

        return res.status(200).send("Report updated successfully");
    } else {
        return res.status(403).send("Forbiden! You are not allowed");
    }
});

const deleteReport = catchAsync(async (req, res) => {
    const { permissions } = req.user.roleId;
    const all = permissions.find((i) => i.module === "all");

    if (all) {
        const report = await Report.deleteOne({ _id: req.params.id });

        if (report.deletedCount > 0) {
            return res.status(200).send("Report deleted successfully");
        } else {
            return res.status(404).send("Report not found");
        }
    } else {
        return res.status(403).send("Forbiden! You are not allowed");
    }
});

const getAllReports = catchAsync(async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Find total count of Posst
        const totalCount = await Report.countDocuments();
        // If no key is provided, return all blogs
        const Reports = await Report.find()
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 })
            .exec();

        return res.status(200).json({ Reports, totalCount });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});

module.exports = {
    createReport,
    getReport,
    updateReport,
    deleteReport,
    getAllReports,
};
