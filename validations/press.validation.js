const Joi = require("joi");

const createPost = {
  body: Joi.object({
    cover: Joi.string().trim(),
    title: Joi.string().trim(),
    content: Joi.string().trim().allow('').optional(),
    file: Joi.string().trim().allow('').optional(),
  }).or('content', 'file')
};

module.exports = {
  createPost,
};
