const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
    }
  },  
  {
    timestamps: true,
  }
);

/**
 * @typedef Inquiry

 */
const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
