const Joi = require('joi');

const createInquiry = {
  body: Joi.object().keys({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    message: Joi.string().trim()
  }),
};

module.exports = {
    createInquiry
};