const Joi = require('joi');

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    permissions: Joi.array().items(
        Joi.object({
          module: Joi.string().required(),
          accessLevel: Joi.array().items(Joi.string()).required()
        })
      ).required()
  }),
};

module.exports = {
    createRole
};