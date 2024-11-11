const Joi = require('joi');

const createFilter = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  createFilter
};