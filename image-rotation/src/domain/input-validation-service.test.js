import inputValidationService from './input-validation-service.js'
import chai from 'chai'
import { InputValidationError } from './progimage-errors.js'
import { v4 as uuidV4 } from 'uuid'
const expect = chai.expect

describe('Image validation service test', () => {

    it('Should fail for bulk size above limit', () => {
        const rotations = new Array(1001)
        expect(() => inputValidationService.validateRotationInput(rotations)).to.throw(InputValidationError)
    })

    it('Should fail for invalid uuid', () => {
        const rotations = [
            {imageId: 'invalid_uuid', angle: 180}
        ]
        expect(() => inputValidationService.validateRotationInput(rotations)).to.throw(InputValidationError)
    })

    it('Should fail for invalid angle', () => {
        const rotations = [
            {imageId: uuidV4(), angle: 'invalid_angle'}
        ]
        expect(() => inputValidationService.validateRotationInput(rotations)).to.throw(InputValidationError)
    })

    it('Should pass for valid input', () => {
        const rotations = [
            {imageId: uuidV4(), angle: 'invalid_angle'}
        ]
        expect(() => inputValidationService.validateRotationInput(rotations)).to.not.throw
    })

})