const Joi = require("joi");

const createReport = {
    body: Joi.object().keys({
        cover: Joi.string().trim(),
        title: Joi.string().trim().required(),
        content: Joi.string().trim().allow('').optional(),
        file: Joi.string().trim().allow('').optional(),

    }),
};

module.exports = {
    createReport,
};
