const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Filter
 */
const Filter = mongoose.model('Filter', filterSchema);

module.exports = Filter;
