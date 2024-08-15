const Joi = require("joi");

const createPost = {
  body: Joi.object().keys({
    photo: Joi.string(),
    title: Joi.string().trim(),
    content: Joi.string().trim(),
  }),
};

module.exports = {
  createPost,
};
