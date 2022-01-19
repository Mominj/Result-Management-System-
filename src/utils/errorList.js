exports.errors = {
    UNKNOWN_ERROR: {
        code: 504,
        text: 'Unknown error! Please contact the admin.',
        hints: [],
        info: ''
    },

    NOT_FOUND: {
        code: 404,
        text: 'Not found!',
        hints: [
            'API route not found'
        ],
        info: ''
    },

    IMAGE_SIZE_LIST_MISSING: {
        code: 400,
        text: 'Image sizes parameter is missing.',
        hints: [
            'It requires at least one size to resize the image.'
        ],
        info: ''
    },

    IMAGE_RESIZE_EXCEED: {
        code: 422,
        text: 'Max number of image resizing exceed!',
        hints: [],
        info: ''
    },

    INVALID_ACCESS_TOKEN: {
        code: 401,
        text: 'Access token is not valid!',
        hints: [
            'Access token is expired',
            'Access token is invalid',
        ],
        info: ''
    },
}