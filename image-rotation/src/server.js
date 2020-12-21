'use strict'

import app from './app.js'
import http from 'http'
import log from './common/logger.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    log.info(`Listening on port ${PORT}`)
})