const mongoose = require("mongoose");

const catchAsync = require("../utils/catchAsync");
const { Filter } = require("../models");

const createFilter = catchAsync(async (req, res) => {
  const { name, code, description, other_description, photo, geo } = req.body;

  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    await Filter.create({ name, code, description, other_description, photo, geo });

    return res.status(200).send("Filter created successfully");
  } else {
    return res
      .status(403)
      .send("Forbiden! You are not allowed to create an Filter");
  }
});

const getFilter = catchAsync(async (req, res) => {
  try {
    const filter = await Filter.findById(req.params.id);

    return res.status(200).send(filter);
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(404).json("No filter foud");
  }
});

const updateFilter = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    await Filter.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).send("Filter updated successfully");
  } else {
    return res
      .status(403)
      .send("Forbiden! You are not allowed to create an Filter");
  }
});

const deleteFilter = catchAsync(async (req, res) => {
  console.log(req.user);
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    const filter = await Filter.deleteOne({ _id: req.params.id });

    if (filter.deletedCount > 0) {
      return res.status(200).send("Filter deleted successfully");
    } else {
      return res.status(404).send("Filter not found");
    }
  } else {
    return res
      .status(403)
      .send("Forbiden! You are not allowed to create an agent");
  }
});

// const getAllFilters = catchAsync(async (req, res) => {
//   try {
//     const { key, limit = 10, page = 1 } = req.query;

//     const query = {};
//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     // Add search filters to the query object
//     if (key) {
//       query.$or = [{ name: { $regex: key, $options: "i" } }];
//     }

//     // Find total count of filters
//     const totalCount = await Filter.countDocuments(query);
//     // If no key is provided, return all agents
//     const filters = await Filter.find(query)
//       .limit(parseInt(limit))
//       .skip(skip)
//       .sort({ createdAt: -1 });
//     return res.status(200).json({ filters, totalCount });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     return res.status(500).json("Internal server error");
//   }
// });
const getAllFilters = catchAsync(async (req, res) => {
  try {
    const { key, limit, page = 1 } = req.query;

    const query = {};
    const skip = (parseInt(page) - 1) * (parseInt(limit) || 100000); // Default page limit if limit is undefined or null

    // Add search filters to the query object
    if (key) {
      query.$or = [{ name: { $regex: key, $options: "i" } }];
    }

    // Find total count of filters
    const totalCount = await Filter.countDocuments(query);

    // If limit is provided, apply it. If not, remove the limit condition to get all data
    const filtersQuery = Filter.find(query)
      .skip(skip)
      .sort({ createdAt: -1 });

    if (limit) {
      filtersQuery.limit(parseInt(limit));
    }

    const filters = await filtersQuery;

    return res.status(200).json({ filters, totalCount });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});
module.exports = {
  createFilter,
  getFilter,
  updateFilter,
  deleteFilter,
  getAllFilters,
};
