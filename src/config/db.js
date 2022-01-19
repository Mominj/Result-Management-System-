const joi = require('joi')
const envVarsSchema = joi.object({
    DATABASE_NAME: joi.string()
        .required(),
    DATABASE_PORT: joi.number()
        .required(),
    DATABASE_HOST: joi.string()
        .required(),
    DATABASE_USER: joi.string()
        .required(),
    DATABASE_PASSWORD: joi.string()
        .required(),
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    db: {
        name: envVars.DATABASE_NAME,
        port: Number(envVars.DATABASE_PORT),
        host: envVars.DATABASE_HOST,
        user: envVars.DATABASE_USER,
        password: envVars.DATABASE_PASSWORD,
    }
}

module.exports = config