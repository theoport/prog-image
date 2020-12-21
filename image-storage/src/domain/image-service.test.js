'use strict'

import {v4 as uuidv4} from 'uuid'
import { PassThrough } from 'stream'
import sinon from 'sinon'
import chai from 'chai'
import imageService from './image-service.js'
import inputValidationService from './input-validation-service.js'
import imageRepository from '../dao/image-repository.js'
import imageConverterFactory from './converter/image-converter-factory.js'

const expect = chai.expect

describe('Image service test', () => {

    let validateImageStreamStub
    let validateGetImageKeyStub
    let persistImageStub
    let getImageStub
    let getImageConverterStub

    beforeEach(() => {
        validateImageStreamStub = sinon.stub(inputValidationService, "validateCreateImageStream")
        validateGetImageKeyStub = sinon.stub(inputValidationService, "validateGetImageKey")
        persistImageStub = sinon.stub(imageRepository, "persistImage")
        getImageStub = sinon.stub(imageRepository, "getImage")
        getImageConverterStub = sinon.stub(imageConverterFactory, "get")
    });

    afterEach(() => {
        validateImageStreamStub.restore()
        validateGetImageKeyStub.restore()
        persistImageStub.restore()
        getImageStub.restore()
        getImageConverterStub.restore()
    });

    it('should persist image', async () => {
        const uuid = uuidv4();
        const mockStream = new PassThrough()

        validateImageStreamStub.returns(Promise.resolve(mockStream))
        persistImageStub.returns(Promise.resolve(uuid))

        const result = await imageService.createImage(mockStream)

        expect(result).to.equal(uuid)
        sinon.assert.calledWithExactly(persistImageStub, mockStream)
    })

    it('should get original image if no file extension provided', async () => {
        const key = `${uuidv4()}`
        const mockStream = new PassThrough()

        validateGetImageKeyStub.returns(undefined)
        getImageStub.returns(Promise.resolve({imageStream: mockStream, mime: 'image/jpeg', ext: 'jpg'}))

        const result = await imageService.getOrTransformImage(key)

        expect(result.imageStream).to.equal(mockStream)
        expect(result.mime).to.equal('image/jpeg')
        sinon.assert.calledOnce(validateGetImageKeyStub)
        sinon.assert.notCalled(getImageConverterStub)
    })

    it('should get original image if file extension matches original', async () => {
        const key = `${uuidv4()}.jpg`
        const mockStream = new PassThrough()

        validateGetImageKeyStub.returns(undefined)
        getImageStub.returns(Promise.resolve({imageStream: mockStream, mime: 'image/jpeg', ext: 'jpg'}))

        const result = await imageService.getOrTransformImage(key)

        expect(result.imageStream).to.equal(mockStream)
        expect(result.mime).to.equal('image/jpeg')
        sinon.assert.calledOnce(validateGetImageKeyStub)
        sinon.assert.notCalled(getImageConverterStub)
    })

    it('should convert image for different file extension', async () => {
        const key = `${uuidv4()}.png`
        const mockStream = new PassThrough()
        const mockStream2 = new PassThrough()

        validateGetImageKeyStub.returns(undefined)
        getImageStub.returns(Promise.resolve({imageStream: mockStream, mime: 'image/jpeg', ext: 'jpg'}))
        getImageConverterStub.returns({convert: (_inputStream) => (
            Promise.resolve({imageStream: mockStream2, mime: 'image/png'}))
        })

        const result = await imageService.getOrTransformImage(key)

        expect(result.imageStream).to.equal(mockStream2)
        expect(result.mime).to.equal('image/png')
        sinon.assert.calledOnce(validateGetImageKeyStub)
        sinon.assert.calledOnce(getImageConverterStub)
    })

})
