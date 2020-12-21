'use strict'

import app from './app.js'
import http from 'http'
import log from './common/logger.js'

const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    log.info("Listening on port 3000")
})

export default server