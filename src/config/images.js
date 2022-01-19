const joi = require('joi')

const envVarsSchema = joi.object({
    DEFAULT_TARGET_FOLDER_NAME: joi.string()
        .required(),
    MAX_NUMBER_IMAGE_RESIZE: joi.number()
        .required(),
}).unknown()
    .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    images: {
        general_folder_name: envVars.DEFAULT_TARGET_FOLDER_NAME,
        max_amount_size: Number(envVars.MAX_NUMBER_IMAGE_RESIZE),
    }
}

module.exports = config