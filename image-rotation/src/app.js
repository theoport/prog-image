'use strict'

import express from 'express'
import routes from './rest/routes.js'
import bodyParser from 'body-parser'
import { InputValidationError } from './domain/progimage-errors.js'
import log from './common/logger.js'

const app = express()

app.use(bodyParser.json())

routes.forEach(([route, controller]) => app.use(route, controller))

app.use((err, req, res, next) => {
    log.error(err)
    let statusCode
    let message
    if (err instanceof InputValidationError) {
        statusCode = 400
        message = 'Bad Request'
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