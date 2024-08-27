const catchAsync = require("../utils/catchAsync");
const { Press } = require("../models");

const createPost = catchAsync(async (req, res) => {
  console.log("posttttt")
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    await Press.create(req.body);

    return res.status(200).send("Post created successfully");
  } else {
    return res.status(403).send("Forbiden! You are not allowed");
  }
});

const getPost = catchAsync(async (req, res) => {
  try {
    const post = await Press.findById(req.params.id).exec();

    return res.status(200).send(post);
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(404).json("No filter foud");
  }
});

const updatePost = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    await Press.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).send("Post updated successfully");
  } else {
    return res.status(403).send("Forbiden! You are not allowed");
  }
});

const deletePost = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId;
  const all = permissions.find((i) => i.module === "all");

  if (all) {
    const post = await Press.deleteOne({ _id: req.params.id });

    if (post.deletedCount > 0) {
      return res.status(200).send("Post deleted successfully");
    } else {
      return res.status(404).send("Post not found");
    }
  } else {
    return res.status(403).send("Forbiden! You are not allowed");
  }
});

const getAllPosts = catchAsync(async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Find total count of Posst
    const totalCount = await Press.countDocuments();
    // If no key is provided, return all blogs
    const posts = await Press.find()
      .limit(parseInt(limit))
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec();
    console.log("posts", posts)
    return res.status(200).json({ posts, totalCount });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
};
