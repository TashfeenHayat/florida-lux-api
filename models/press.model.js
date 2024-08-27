const mongoose = require("mongoose");

const pressSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
    },
    cover: {
      type: String,
    },
    file: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Press
 */
const Press = mongoose.model("Press", pressSchema);

module.exports = Press;
