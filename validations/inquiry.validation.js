const Joi = require('joi');

const createInquiry = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim(),
    email: Joi.string().trim().email().required(),
    propertyId: Joi.string().trim().allow('').optional(),
    requestVisit: Joi.boolean().allow('').optional(),
    message: Joi.string().allow('').optional(),
    html: Joi.string().allow('').optional(), // ✅ optional HTML template from frontend
  }),
};

module.exports = {
  createInquiry,
};
