const Joi = require("joi");

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().trim(),
    cover: Joi.string().trim(),
    content: Joi.string().trim(),
  }),
};

module.exports = {
  createPost,
};
