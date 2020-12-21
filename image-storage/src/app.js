'use strict'

import express from 'express'
import routes from './rest/routes.js'
import {InputValidationError, NotFoundError} from './domain/progimage-errors.js'
import log from './common/logger.js'

const app = express()

routes.forEach(([route, controller]) => app.use(route, controller))

app.use((err, req, res) => {
    log.error(err)
    let statusCode
    let message
    if (err instanceof InputValidationError) {
        statusCode = 400
        message = 'Bad Request'
    } else if (err instanceof NotFoundError) {
        statusCode = 404
        message = 'Not Found '
    } else {
        statusCode = 500
        message = 'Internal Error'
    }
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    })
})

export default app