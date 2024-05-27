const Joi = require("joi");

const createProperty = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    code: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('for_sale', 'sold', 'incoming', 'for_rent', 'featured').default('incoming'),
    media: Joi.array().items(Joi.object({
      smUrl: Joi.string(),
      mdUrl: Joi.string(),
      xlUrl: Joi.string()
    })),
    neighborhood: Joi.string(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.string(),
    longitude: Joi.string(),
    latitude: Joi.string(),
    area: Joi.string(),
    areaUnit: Joi.string(),
    leasePeriod: Joi.string(),
    salePrice: Joi.string(),
    reducedPrice: Joi.string(),
    currency: Joi.string(),
    visitHours: Joi.string(),
    bedroomCount: Joi.string(),
    bathCount: Joi.string(),
    yearBuilt: Joi.string(),
    foundation: Joi.string(),
    stories: Joi.string(),
    roof: Joi.string(),
    flooring: Joi.string(),
    cooling: Joi.string(),
    heating: Joi.string(),
    fireplace: Joi.string(),
    style: Joi.string(),
    pool: Joi.string(),
    parking: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    reference: Joi.string(),
    mlsId: Joi.string(),
    agentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming agentId is a valid MongoDB ObjectId
    filters: Joi.array().items(Joi.string()), // Assuming filterIds are valid MongoDB ObjectIds
  }),
};

const updateProperty = {
  body: Joi.object().keys({
    name: Joi.string(),
    code: Joi.string(),
    description: Joi.string(),
    status: Joi.string()
      .valid("for_sale", "sold", "incoming", "for_rent")
      .default("incoming"),
    media: Joi.array().items(
      Joi.object({
        smUrl: Joi.string(),
        mdUrl: Joi.string(),
        xlUrl: Joi.string(),
      })
    ),
    neighborhood: Joi.string(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.string(),
    longitude: Joi.string(),
    latitude: Joi.string(),
    area: Joi.string(),
    areaUnit: Joi.string(),
    leasePeriod: Joi.string(),
    salePrice: Joi.string(),
    reducedPrice: Joi.string(),
    currency: Joi.string(),
    visitHours: Joi.string(),
    bedroomCount: Joi.string(),
    bathCount: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    reference: Joi.string(),
    agentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Assuming agentId is a valid MongoDB ObjectId
    filters: Joi.array().items(Joi.string()), // Assuming filterIds are valid MongoDB ObjectIds
  }),
};

const getProperty = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createProperty,
  updateProperty,
};
