'use strict'

import inputValidationService from './input-validation-service.js'
import { v4 as uuiv4 } from 'uuid'
import chai from 'chai'
import { InputValidationError } from './progimage-errors.js'
const expect = chai.expect

describe('Input validation service test', () => {
    it('should fail on invalid image format', () => {
        expect(() => inputValidationService.validateGetImageKey(uuiv4(), 'gih')).to.throw(InputValidationError)
    })

    it('should fail on invalid uuid', () => {
        expect(() => inputValidationService.validateGetImageKey('invalid_uuid', undefined)).to.throw(InputValidationError)
    })
})