const Joi = require('joi');

const createInquiry = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim(),
    email: Joi.string().trim(),
    propertyId: Joi.string().trim(),
    requestVisit: Joi.boolean(),
    message: Joi.string()
  }),
};

module.exports = {
    createInquiry
};