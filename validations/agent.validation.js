const Joi = require("joi");

const createAgent = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    code: Joi.string(),
    phoneNumber: Joi.string(),
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
