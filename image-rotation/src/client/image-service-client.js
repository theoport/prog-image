'use strict'

import axios from 'axios'
import { ImageService as config } from './client-config.js'

// naive, should use an http connection pool
class ImageServiceClient {

    #baseUrl = `http://${config.host}:${config.port}`

    getImage(id) {
        return axios({
            method: 'GET',
            url: `${this.#baseUrl}/api/v1/images/${id}`,
            responseType: 'stream'
        })
            .then(response => ({stream: response.data, mime: response.headers['content-type']}))
    }

    uploadImage(stream, mime) {
        return axios({
            method: 'POST',
            url: `${this.#baseUrl}/api/v1/images`,
            headers: {
                'Content-Type': mime
            },
            data: stream
        }).then(response => response.data.id)
    }
}

export default new ImageServiceClient()