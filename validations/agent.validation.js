const Joi = require("joi");

const createAgent = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    code: Joi.string(),
    phoneNumber: Joi.object({
      areaCode: Joi.string().length(3).required(), // area code should be a 3-digit string
      countryCode: Joi.number().required(), // country code should be a number
      isoCode: Joi.string().length(2).required(), // ISO code should be a 2-letter string
      phoneNumber: Joi.string().required(), // phone number should be a 6-digit string
    }),
    address: Joi.object({
      addressLine1: Joi.string(),
      addressLine2: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      country: Joi.string(),
      zipCode: Joi.string(),
    }),
    social: Joi.object({
      facebook: Joi.string(),
      insta: Joi.string(),
      linkedin: Joi.string(),
      twitter: Joi.string(),
      other: Joi.string(),
    }),
    description: Joi.string(),
    reference: Joi.string(),
    photo: Joi.string(),
  }),
};

module.exports = {
  createAgent,
};
