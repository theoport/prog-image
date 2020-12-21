import { InputValidationError } from "./progimage-errors.js";
import validator from "validator";

class InputValidationService {

    #MAX_BULK_SIZE = 1000

    validateRotationInput(rotations) {
        if (rotations.length > this.#MAX_BULK_SIZE) {
            throw new InputValidationError(`Bulk request too big. max_size=${this.#MAX_BULK_SIZE}`)
        }
        rotations.forEach(rotation => {
            if (isNaN(rotation.angle)) {
                throw new InputValidationError(`Invalid rotation angle.`)
            }
            if (!validator.isUUID(rotation.imageId)) {
                throw new InputValidationError(`Invalid uuid. id=${rotation.imageId}`)
            }
        })
    }
}

export default new InputValidationService()