'use strict'

import imageServiceClient from '../client/image-service-client.js'
import inputValidationService from './input-validation-service.js'
import sharp from 'sharp'
import AsyncUtils from '../util/async-util.js'

class ImageRotationService {

    async rotateBulk(rotations) {
        inputValidationService.validateRotationInput(rotations)
        const promises = rotations.map(this.#processRotation)
        const { resolvedPromises: rotatedImages, errorOccured: partialFailure } =
            await AsyncUtils.resolvePromisesIgnoreFailure(promises)
        return { rotatedImages, partialFailure }
    }

    #processRotation = async ({ imageId, angle }) => {
        const { stream: inputStream, mime } = await imageServiceClient.getImage(imageId)
        const outputStream = inputStream.pipe(sharp().rotate(angle))
        const rotatedImageId = await imageServiceClient.uploadImage(outputStream, mime)
        outputStream.destroy()
        inputStream.destroy()
        return {originalImageId: imageId, rotatedImageId: rotatedImageId}
    }
}

export default new ImageRotationService()