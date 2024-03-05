const Joi = require('joi');

const createProperty = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
    createProperty
};