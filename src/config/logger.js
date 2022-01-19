const joi = require('joi')

const envVarsSchema = joi.object({
    MORGAN_FORMAT: joi.string()
        .allow(['combined', 'common', 'dev', 'short', 'tiny'])
        .default('tiny'),
    MORGAN_ENABLED: joi.boolean()
        .truthy('TRUE')
        .truthy('true')
        .falsy('FALSE')
        .falsy('false')
        .default(true)
}).unknown()
    .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    morgan: {
        format: envVars.MORGAN_FORMAT || 'tiny',
        enabled: envVars.MORGAN_ENABLED
    },
}

module.exports = config