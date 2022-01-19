const  Joi = require('joi');

const isPassValid = Joi.object({
    password: Joi.string().min(5).required()
})

module.exports = isPassValid