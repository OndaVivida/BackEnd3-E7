import CustomError from "../errors/custom.error.js"
import ERROR_CODES from "../errors/codes.error.js"
import logger from "../config/logger.js"
import deleteMulterUploads from "../utils/eliminarUploadsMulter.js"

function errorHandler(err, req, res, next) {
    const isCustomError = err instanceof CustomError
    const customError = isCustomError ? err : errorMapper(err)

    const metadatos = {
        message: customError.message,
        method: req.method,
        path: req.path
    }

    if (req.file || req.files) {
        deleteMulterUploads(req.file ?? req.files)
    }

    if (customError.statusCode >= 500) {
        metadatos.message = `${metadatos.message}.\n${err.name}: ${err.message}.\n${err.stack}\nStack:`
        logger.error(customError.name, {...metadatos, stack: customError.stack}) 
    } else {
        logger.warn(customError.name, metadatos)
        logger.debug(`${err.name}: ${err.message}.`)
    }

    res.status(customError.statusCode).json({error: customError.name, message: customError.message})
}

function errorMapper(error) {
    if (error.name === "MulterError") {
        return multerErrors(error)
    }
    if (error.name === "CastError") {
        return new CustomError(ERROR_CODES.INVALID_ID)
    }
    if (error.name === "ValidationError") {
        return new CustomError(ERROR_CODES.VALIDATION_ERROR)
    }
    if (error.code === 11000) {
        return new CustomError(ERROR_CODES.DUPLICATE_KEY)
    }
    if (error.name === "SyntaxError") {
        return new CustomError(ERROR_CODES.SYNTAX_ERROR)
    }

    return new CustomError(ERROR_CODES.INTERNAL_SERVER_ERROR)
}

function multerErrors(error) {
    switch (error.code) {
        case "LIMIT_FILE_SIZE":
            return new CustomError(ERROR_CODES.FILE_TOO_LARGE)
            
        case "LIMIT_UNEXPECTED_FILE":
            return new CustomError(ERROR_CODES.INVALID_DOCUMENT_INPUT_FIELD)
            
        case "LIMIT_FILE_COUNT":
            return new CustomError(ERROR_CODES.LIMIT_FILE_COUNT)
            
        default:
            return new CustomError(ERROR_CODES.UPLOAD_ERROR)
    }
}

export default errorHandler