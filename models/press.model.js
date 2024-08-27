const mongoose = require("mongoose");

const pressSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    cover: {
      type: String,
    },
    content: {
      type: String,
    },file:{
type: String,
    },


    photo: {
      type: String,
    },
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
