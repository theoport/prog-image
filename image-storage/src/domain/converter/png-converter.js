'use strict'

import sharp from 'sharp'

class PngConverter {
    convert(imageStream) {
        return {imageStream: imageStream.pipe(sharp().png()), mime: 'image/png'}
    }
}

export default new PngConverter()