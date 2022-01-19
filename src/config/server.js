const joi = require('joi')


const envVarsSchema = joi.object({  PORT: joi.number()
    .required()}).unknown()
    .required()
    

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    server: {
        port: Number(envVars.PORT)
    },
}

module.exports = config