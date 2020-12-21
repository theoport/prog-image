import imageServiceClient from '../client/image-service-client.js'
import inputValidationService from './input-validation-service.js'
import imageRotationService from './image-rotation-service.js'
import {v4 as uuidv4} from 'uuid'
import { PassThrough } from 'stream'
import sinon from 'sinon'
import chai from 'chai'

const expect = chai.expect

describe('Image rotation service test', () => {
    const getImageStub = sinon.stub(imageServiceClient, "getImage")
    const uploadImageStub = sinon.stub(imageServiceClient, "uploadImage")
    const validateRotationStub = sinon.stub(inputValidationService, "validateRotationInput")
    let mockStream

    beforeEach(() => {
        mockStream = new PassThrough()
    })

    afterEach(() => {
        getImageStub.restore()
        uploadImageStub.restore()
        validateRotationStub.restore()
    })

    it('should rotate images in bulk', async () => {
        const originalId1 = uuidv4()
        const originalId2 = uuidv4()
        const rotatedId1 = uuidv4()
        const rotatedId2 = uuidv4()
        const rotations = [
            {imageId: originalId1, angle: 90},
            {imageId: originalId2, angle: 180}
        ]

        getImageStub.returns(Promise.resolve({stream: mockStream, mime: 'image/jpeg'}))
        uploadImageStub.onCall(0).returns(Promise.resolve(rotatedId1))
        uploadImageStub.onCall(1).returns(Promise.resolve(rotatedId2))

        const result = await imageRotationService.rotateBulk(rotations)

        expect(result.rotatedImages).to.deep.include.members([
            {originalImageId: originalId1, rotatedImageId: rotatedId1},
            {originalImageId: originalId2, rotatedImageId: rotatedId2}
        ])
        expect(result.partialFailure).to.be.false
        sinon.assert.calledTwice(getImageStub)
        sinon.assert.calledTwice(uploadImageStub)
    })
})
