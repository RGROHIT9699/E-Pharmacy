const Joi = require('joi');

const productKaSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required()
});

const reviewKaSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().required()
})

module.exports = {productKaSchema,reviewKaSchema};
