import errorsDictionary from "../../errors/dictionary.error.js";

export default function errorResponsesBuilder() {
    
    return Object.entries(errorsDictionary).reduce((errorResponses, [errorClave, errorValor]) => {
        const clave = `Error_${errorClave}`
        errorResponses[clave] = {
            description: `Estructura de Error "${errorValor.statusCode}" devuelto por la API.`,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            error: {
                                type: "string",
                                example: errorClave
                            },
                            message: {
                                type: "string",
                                example: errorValor.message
                            }
                        }
                    }
                }
            }
        }
        return errorResponses
    }, {})
}