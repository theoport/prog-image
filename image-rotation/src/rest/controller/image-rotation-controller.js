'use strict'

import express from 'express'
import imageRotationService from '../../domain/image-rotation-service.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        const {rotatedImages, partialFailure} = await imageRotationService.rotateBulk(req.body.rotations)
        res.status(partialFailure ? 207 : 200).json({rotatedImages})
    } catch(err) {
        next(err)
    }
})

export default router