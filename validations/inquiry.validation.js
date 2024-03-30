const Joi = require('joi');

const createInquiry = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    message: Joi.string().trim().required()
  }),
};

module.exports = {
    createInquiry
};