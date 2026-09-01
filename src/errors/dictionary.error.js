import ERROR_CODES from "./codes.error.js"

const errorsDictionary = Object.freeze({
    [ERROR_CODES.INVALID_ID]: {
        statusCode: 400,
        message: "El id enviado no es válido"
    },
    [ERROR_CODES.USER_NOT_FOUND]: {
        statusCode: 404,
        message: "No se encontró el usuario solicitado"
    },
    [ERROR_CODES.ORDER_NOT_FOUND]: {
        statusCode: 404,
        message: "No se encontró la orden solicitada"
    },
    [ERROR_CODES.DELIVERY_NOT_FOUND]: {
        statusCode: 404,
        message: "No se encontró la entrega solicitada"
    },
    [ERROR_CODES.INVALID_INPUT]: {
        statusCode: 400,
        message: "Parametros de entrada inválidos"
    },
    [ERROR_CODES.INVALID_ORDER_STATUS]: {
        statusCode: 400,
        message: "El estado no es válido para una orden"
    },
    [ERROR_CODES.INVALID_DELIVERY_STATUS]: {
        statusCode: 400,
        message: "El estado no es válido para una entrega"
    },
    [ERROR_CODES.ORDER_ALREADY_DELIVERED]: {
        statusCode: 409,
        message: "El pedido ya fue entregado y no puede modificarse"
    },
    [ERROR_CODES.DRIVER_NOT_AVAILABLE]: {
        statusCode: 409,
        message: "El repartidor no está disponible"
    },
    [ERROR_CODES.VALIDATION_ERROR]: {
        statusCode: 400,
        message: "Los datos enviados son inválidos"
    },
    [ERROR_CODES.DUPLICATE_KEY]: {
        statusCode: 409,
        message: "Los datos enviados son inválidos"
    },
    [ERROR_CODES.DATABASE_ERROR]: {
        statusCode: 502,
        message: "Error de la base de datos"
    },
    [ERROR_CODES.ROUTE_NOT_FOUND]: {
        statusCode: 404,
        message: "Página no encontrada"
    },
    [ERROR_CODES.UNAUTHORIZED]: {
        statusCode: 401,
        message: "Acceso denegado"
    },
    [ERROR_CODES.FORBIDDEN]: {
        statusCode: 403,
        message: "Acceso denegado"
    },
    [ERROR_CODES.FILE_REQUIRED]: {
        statusCode: 400,
        message: "Se requiere un archivo"
    },
    [ERROR_CODES.INVALID_FILE_TYPE]: {
        statusCode: 400,
        message: "Tipo de archivo inválido"
    },
    [ERROR_CODES.FILE_TOO_LARGE]: {
        statusCode: 400,
        message: "Archivo muy grande"
    },
    [ERROR_CODES.INVALID_DOCUMENT_TYPE]: {
        statusCode: 400,
        message: "Tipo de documento inválido"
    },
    [ERROR_CODES.UPLOAD_ERROR]: {
        statusCode: 500,
        message: "Error al guardar el archivo"
    },    
    [ERROR_CODES.SYNTAX_ERROR]: {
        statusCode: 400,
        message: "Error de sintaxis"
    },
    [ERROR_CODES.MOCK_INVALID_AMOUNT]: {
        statusCode: 400,
        message: "La cantidad debe ser un número entero entre 1 y 100"
    },
    [ERROR_CODES.MOCK_INVALID_TYPE]: {
        statusCode: 400,
        message: "El tipo ingresado es inválido"
    },
    [ERROR_CODES.MOCK_GENERATION_ERROR]: {
        statusCode: 500,
        message: "Error en la generación de mocks"
    },
    [ERROR_CODES.INTERNAL_SERVER_ERROR]: {
        statusCode: 500,
        message: "Error Interno del Servidor"
    },
})

export default errorsDictionary