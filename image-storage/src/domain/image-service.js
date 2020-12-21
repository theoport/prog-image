'use strict'

import inputValidationService from './input-validation-service.js'
import imageRepository from '../dao/image-repository.js'
import imageConverterFactory from './converter/image-converter-factory.js'

class ImageService {

    async createImage(inputStream) {
        const validatedStream = await inputValidationService.validateCreateImageStream(inputStream)
        return imageRepository.persistImage(validatedStream)
    }

    async getOrTransformImage(key) {
        const [id, fileExtension] = key.split('.')
        inputValidationService.validateGetImageKey(id, fileExtension)
        const { imageStream, mime, ext: originalExtension } = await imageRepository.getImage(id)
        if (fileExtension && fileExtension !== originalExtension) {
            return imageConverterFactory.get(fileExtension).convert(imageStream)
        }
        return {imageStream, mime}
    }
}

export default new ImageService()