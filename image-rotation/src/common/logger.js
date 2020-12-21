import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'image-rotation' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ]
})

export default logger