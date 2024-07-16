const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Blog
 */
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
