const mongoose = require("mongoose");

const filterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
    },
    description: {
      type: String,
    },
    photo: {
      type: String,
    },
    features: [
      {
        name: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    geo: {
      east: {
        type: String,
      },
      west: {
        type: String,
      },
      north: {
        type: String,
      },
      south: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Filter
 */
const Filter = mongoose.model("Filter", filterSchema);

module.exports = Filter;
