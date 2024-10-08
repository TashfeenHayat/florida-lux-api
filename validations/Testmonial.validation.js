const Joi = require("joi");

const createTestmonial = {
    body: Joi.object().keys({
        Username: Joi.string().trim().required(),
        content: Joi.string().trim().required(),
        agentId: Joi.string().trim().required(),
        rating: Joi.number()
            .min(1)
            .max(5)
            .required()
    }),
};

module.exports = {
    createTestmonial,
};
