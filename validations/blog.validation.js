const Joi = require("joi");

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().allow('').optional(),
    agentId: Joi.string().trim().required(),
    file: Joi.string().trim().allow('').optional(),
  }),
};

module.exports = {
  createBlog,
};
