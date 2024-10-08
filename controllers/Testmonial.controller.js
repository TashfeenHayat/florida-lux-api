const catchAsync = require("../utils/catchAsync");
const { Testmonial } = require("../models");

const createTestmonial = catchAsync(async (req, res) => {
    const { permissions } = req.user.roleId;
    const all = permissions.find((i) => i.module === "all");

    if (all) {
        const newTestmonial = await Testmonial.create(req.body);
        console.log(newTestmonial)
        return res.status(201).json({
            message: "Testmonial created successfully",
            data: newTestmonial,
        });
    } else {
        return res.status(403).json({ message: "Forbidden! You are not allowed" });
    }
});

const getTestmonial = catchAsync(async (req, res) => {
    const testmonial = await Testmonial.findById(req.params.id)
        .populate({
            path: "agentId",
        })
        .exec();

    if (!testmonial) {
        return res.status(404).json({ message: "Testmonial not found" });
    }

    return res.status(200).json(testmonial);
});

const updateTestmonial = catchAsync(async (req, res) => {
    const { permissions } = req.user.roleId;
    const all = permissions.find((i) => i.module === "all");

    if (all) {
        const updatedTestmonial = await Testmonial.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedTestmonial) {
            return res.status(404).json({ message: "Testmonial not found" });
        }

        return res.status(200).json({
            message: "Testmonial updated successfully",
            data: updatedTestmonial,
        });
    } else {
        return res.status(403).json({ message: "Forbidden! You are not allowed" });
    }
});

const deleteTestmonial = catchAsync(async (req, res) => {
    const { permissions } = req.user.roleId;
    const all = permissions.find((i) => i.module === "all");

    if (all) {
        const testmonial = await Testmonial.findByIdAndDelete(req.params.id);

        if (!testmonial) {
            return res.status(404).json({ message: "Testmonial not found" });
        }

        return res.status(200).json({ message: "Testmonial deleted successfully" });
    } else {
        return res.status(403).json({ message: "Forbidden! You are not allowed" });
    }
});

const getAllTestmonials = catchAsync(async (req, res) => {
    const { limit = 10, page = 1, agentId } = req.query;

    const query = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    if (agentId) {
        query.agentId = agentId;
    }

    const totalCount = await Testmonial.countDocuments(query);
    const testmonials = await Testmonial.find(query)
        .populate({
            path: "agentId",
        })
        .limit(parseInt(limit))
        .skip(skip)
        .sort({ createdAt: -1 })
        .exec();

    return res.status(200).json({ testmonials, totalCount });
});

module.exports = {
    createTestmonial,
    getTestmonial,
    updateTestmonial,
    deleteTestmonial,
    getAllTestmonials,
};
