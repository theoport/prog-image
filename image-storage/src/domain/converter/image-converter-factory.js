'use strict'

import JpegConverter from './jpeg-converter.js'
import TiffConverter from './tiff-converter.js'
import PngConverter from './png-converter.js'
import {InternalError} from '../progimage-errors.js'

class ImageConverterFactory {
    #converterByFileExtension = new Map()

    constructor() {
        this.#converterByFileExtension.set('jpg', JpegConverter)
        this.#converterByFileExtension.set('tif', TiffConverter)
        this.#converterByFileExtension.set('png', PngConverter)
    }

    get(fileExtension) {
        const converter = this.#converterByFileExtension.get(fileExtension)
        if (!converter) {
            throw new InternalError(`No converter for file extension. file_extension=${fileExtension}`)
        }
        return converter
    }
}

export default new ImageConverterFactory()