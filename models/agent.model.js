const mongoose = require("mongoose");

const agentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
    },
    phoneNumber: {
      areaCode: {
        type: String,
        length: 3,
      },
      countryCode: {
        type: Number,
      },
      isoCode: {
        type: String,
        length: 2,
      },
      phoneNumber: {
        type: String,
        length: 6,
      },
    },

    address: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      zipCode: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    reference: {
      type: String,
    },
    photo: {
      type: String,
    },
    social: {
      facebook: {
        type: String,
      },
      insta: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      twitter: {
        type: String,
      },
      other: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Agent
 */
const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
