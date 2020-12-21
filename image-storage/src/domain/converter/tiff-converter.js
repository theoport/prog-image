'use strict'

import sharp from 'sharp'

class TiffConverter {
    convert(imageStream) {
        return {imageStream: imageStream.pipe(sharp().tiff()), mime: 'image/tiff'}
    }
}

export default new TiffConverter()