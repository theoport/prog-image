'use strict'

import sharp from 'sharp'

class JpegConverter {
    convert(imageStream) {
        return {imageStream: imageStream.pipe(sharp().jpeg()), mime: 'image/jpeg'}
    }
}

export default new JpegConverter()