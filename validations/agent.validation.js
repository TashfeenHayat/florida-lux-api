const Joi = require('joi');

const createAgent = {
  body: Joi.object().keys({
    id: Joi.any().required(),
    name: Joi.string().trim().required(),
    code: Joi.string(),
    phoneNumber: Joi.string(),
    address: Joi.object({
        addressLine1: Joi.string(),
        addressLine2: Joi.string(),
        state: Joi.string(),
        city: Joi.string(),
        country: Joi.string(),
        zipCode: Joi.string()
    }),
    description: Joi.string(),
    reference: Joi.string(),
    photo: Joi.string()
  }),
};

module.exports = {
    createAgent
};