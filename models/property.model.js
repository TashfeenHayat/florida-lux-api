const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
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

    status: {
      type: String,
      default: "incoming",
      enum: ["for_sale", "sold", "incoming", "for_rent", "featured"],
    },
    media: [
      {
        name: String, // Media name (e.g., image name or file name)
        smUrl: String, // Small resolution URL
        mdUrl: String, // Medium resolution URL
        xlUrl: String, // Extra-large resolution URL
      }
    ],
    video: [
     {
        name: String, // Media name (e.g., image name or file name)
        smUrl: String, // Small resolution URL
        mdUrl: String, // Medium resolution URL
        xlUrl: String, // Extra-large resolution URL
      }
    ],
    neighborhood: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    state: { type: String },
    city: { type: String },
    country: { type: String },
    zipCode: { type: String },
    longitude: { type: String },
    latitude: { type: String },
    area: { type: String },
    areaUnit: { type: String },
    leasePeriod: { type: String },
    salePrice: { type: String },
    reducedPrice: { type: String },
    currency: { type: String },
    visitHours: { type: String },
    bedroomCount: { type: String },
    bathCount: { type: String },
    yearBuilt: { type: String },
    foundation: { type: String },
    stories: { type: String },
    roof: { type: String },
    flooring: { type: String },
    cooling: { type: String },
    heating: { type: String },
    waterfront: { type: String },
    style: { type: String },
    pool: { type: String },
    parking: { type: String },
    tags: [String],  // Use [String] if tags are just an array of strings
    reference: { type: String },
    mlsId: { type: String },
    compensation: { type: String },
    Secondary_agentId: {
      type: Schema.Types.ObjectId,

      ref: "Agent",


      default: null,

    },
    Primary_agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  fireplace:{type:String},
    filters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Filter",
      },
    ],
    features: [
      {
        name: { type: String },
        description: { type: String },
      },
    ],
    geo: { type: Object },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
