import CustomError from "../errors/custom.error.js"
import ERROR_CODES from "../errors/codes.error.js"
import logger from "../config/logger.js"

export default function notFoundHandler(req, res, next) {
    logger.warn(ERROR_CODES.ROUTE_NOT_FOUND)
    next(new CustomError(ERROR_CODES.ROUTE_NOT_FOUND))
}