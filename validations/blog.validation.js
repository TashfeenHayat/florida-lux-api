const Joi = require("joi");

const createBlog = {
  body: Joi.object().keys({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    agentId: Joi.string().trim().required(),
  }),
};

module.exports = {
  createBlog,
};
