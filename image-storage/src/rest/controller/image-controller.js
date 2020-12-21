'use strict'

import express from 'express'
import imageService from '../../domain/image-service.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        const id = await imageService.createImage(req)
        res.status(200).json({id})
    } catch(err) {
        next(err)
    }
})

router.get('/:key', async (req, res, next) => {
    try {
        const {imageStream, mime} = await imageService.getOrTransformImage(req.params.key)
        res.contentType(mime).status(200)
        imageStream.pipe(res)
    } catch (err) {
        next(err)
    }
})

export default router