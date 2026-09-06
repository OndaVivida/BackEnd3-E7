import multer from "multer"
import __dirname from "../utils/dirname.js"
import fs from "fs"
import path from "path"
import CustomError from "../errors/custom.error.js"
import ERROR_CODES from "../errors/codes.error.js"
import { DOCUMENT_TYPES } from "../constants/index.js"
import logger from "./logger.js"

const mimeTypesPermitidos = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "text/plain"
]

function existeCarpeta(carpeta) {
    if (!fs.existsSync(carpeta)) {
        fs.mkdirSync(carpeta, { recursive: true })
    }
}

function obtenerCarpetaDestino(fieldname) {
    if (fieldname === "delivered") {
        return "/proofs"
    }
    return "/documents"
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const carpeta = path.join(__dirname, "../uploads", obtenerCarpetaDestino(file.fieldname))
        existeCarpeta(carpeta)
        cb(null, carpeta)
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const fileName = `${Date.now()}-${Math.random(Math.random() * 1e9)}${extension}`
        cb(null, fileName)
    }
})

const fileFilter = (req, file, cb) => {
    if (mimeTypesPermitidos.includes(file.mimetype)) { 
        cb(null, true)
        return
    }
    logger.debug("Error de tipo en archivo")
    cb(new CustomError(ERROR_CODES.INVALID_FILE_TYPE), false)
}

export const uploader = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
        files: 3
    },
})