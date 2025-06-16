const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    },
    requestVisit: {
        type: Boolean
    },
    message: {
      type: String,
    },
     html: { type: String },
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
