const Joi = require("joi");

const createReport = {
    body: Joi.object().keys({
        title: Joi.string().trim().required(),
        content: Joi.string().trim().optional()
    }),
};

module.exports = {
    createReport,
};
