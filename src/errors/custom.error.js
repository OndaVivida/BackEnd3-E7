import logger from "../config/logger.js"
import ERROR_CODES from "./codes.error.js"
import errorsDictionary from "./dictionary.error.js"

class CustomError extends Error {
    constructor(name, message) {
        const errorDefinition = errorsDictionary[name] ?? errorsDictionary[ERROR_CODES.INTERNAL_SERVER_ERROR]
        message = message ?? errorDefinition.message
        
        logger.debug(`Error creado: ${errorDefinition.statusCode} ${name} "${message}"`)

        super(message)
        this.statusCode = errorDefinition.statusCode
        this.name = name
        this.message = message

        Error.captureStackTrace(this, this.constructor)
    }
}

export default CustomError