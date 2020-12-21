'use strict'

import FileType from 'stream-file-type'
import {InputValidationError} from "./progimage-errors.js"
import validator from 'validator'

class InputValidationService {
    #validMimeTypes = ['image/jpeg', 'image/png', 'image/tiff']
    #validExtensions = ['jpg', 'png', 'tif']

    validateCreateImageStream = async (inputStream) => {
        const outputStream = new FileType()
        inputStream.pipe(outputStream)
        const fileInfo = await outputStream.fileTypePromise()
        this.#validateMimeType(fileInfo)
        return outputStream
    }

    validateGetImageKey = (id, fileExtension) => {
        if (fileExtension && !this.#validExtensions.includes(fileExtension)) {
            throw new InputValidationError(`Cannot transform to requested file extension. requested_ext=[${fileExtension}], ` +
                `allowed_ext=${this.#validExtensions.join(',')}`)
        }
        if (!validator.isUUID(id)) {
            throw new InputValidationError(`Invalid uuid`)
        }
        return ({id, extension: fileExtension})
    }

    #validateMimeType = (fileInfo) => {
        if (!fileInfo) {
            throw new InputValidationError(`Invalid file format`)
        }
        if (!this.#validMimeTypes.includes(fileInfo.mime)) {
            throw new InputValidationError(`Invalid file mime type. supplied_type=[${fileInfo.mime}], ` +
                `allowed_types=${this.#validMimeTypes.join(',')}`)
        }
    }
}

export default new InputValidationService()