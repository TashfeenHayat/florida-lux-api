const catchAsync = require("../utils/catchAsync");
const { Blog } = require("../models");

const createBlog = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    await Blog.create(req.body);

    return res.status(200).send("Blog created successfully");
  } else {
    return res.status(403).send("Forbiden! You are not allowed");
  }
});

const getBlog = catchAsync(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate({
        path: "agentId",
      })
      .exec();

    return res.status(200).send(blog);
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(404).json("No filter foud");
  }
});

const updateBlog = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    await Blog.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).send("Blog updated successfully");
  } else {
    return res.status(403).send("Forbiden! You are not allowed");
  }
});

const deleteBlog = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    const blog = await Blog.deleteOne({ _id: req.params.id });

    if (blog.deletedCount > 0) {
      return res.status(200).send("Blog deleted successfully");
    } else {
      return res.status(404).send("Blog not found");
    }
  } else {
    return res.status(403).send("Forbiden! You are not allowed");
  }
});

const getAllBlogs = catchAsync(async (req, res) => {
  try {
    const { limit = 10, page = 1, agentId } = req.query;

    const query = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);

    if (agentId) {
      query.agentId = agentId;
    }
    // Find total count of Blog
    const totalCount = await Blog.countDocuments(query);
    // If no key is provided, return all blogs
    const blogs = await Blog.find(query)
      .populate({
        path: "agentId",
      })
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({ blogs, totalCount });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

module.exports = {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
