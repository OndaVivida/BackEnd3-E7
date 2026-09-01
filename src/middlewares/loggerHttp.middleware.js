import logger from "../config/logger.js"

export default function loggerHttp(req, res, next) {
    logger.http(`${req.method} ${req.originalUrl}`)
    next()
}