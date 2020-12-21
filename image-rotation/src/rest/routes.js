'use strict'

import imageRotationController from './controller/image-rotation-controller.js'

const API_BASE_PATH = '/api/v1'

export default [
    [`${API_BASE_PATH}/image-rotation`, imageRotationController]
]
