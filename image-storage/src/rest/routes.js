'use strict'

import imageController from './controller/image-controller.js'

const API_BASE_PATH = '/api/v1'

export default [
    [`${API_BASE_PATH}/images`, imageController]
]