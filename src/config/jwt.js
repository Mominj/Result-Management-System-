const joi = require('joi')

const envVarsSchema = joi.object({
    ACCESS_TOKEN_SECRET: joi.string()
        .required(),
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    jwt: {
        accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
    }
}

module.exports = config