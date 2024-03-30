const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
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
