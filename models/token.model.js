const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toeknSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    token: {
      type: String,
      required: true,
    },
    isValid: {
        type: Boolean,
        required: true,
    },
    expiresIn: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', toeknSchema);

module.exports = Token;
