import {v4 as uuidv4} from 'uuid'
import fs from 'fs'
import FileType from 'file-type'
import { InternalError, NotFoundError } from '../domain/progimage-errors.js'

class ImageRepository {

    persistImage(inputStream) {
        const imageId = uuidv4()
        const path = `images/${imageId}`
        const destination = fs.createWriteStream(path, {encoding: 'binary'})
        inputStream.pipe(destination)
        return new Promise((resolve, reject) => {
            destination.on('finish', () => {
                resolve(imageId)
            }).on('error', (err) => {
                fs.unlinkSync(path)
                reject(err)
            })
        })
    }

    async getImage(imageId) {
        const path = `images/${imageId}`
        const fileType = await this.#extractFileType(path)
        const stream = await this.#openFile(path)
        return {imageStream: stream, mime: fileType.mime, ext: fileType.ext}
    }

    #openFile = async (path) => {
        try {
            await fs.promises.access(path, fs.F_OK)
        } catch (err) {
            throw new NotFoundError(`File not found. path=${path}`)
        }
        return fs.createReadStream(path)
    }

    #extractFileType = async (path) => {
        const fileType = await FileType.fromFile(path)
        if (fileType === undefined) {
            throw new InternalError(`Failed to detect file type. path=${path}`)
        }
        return fileType
    }
}

export default new ImageRepository()