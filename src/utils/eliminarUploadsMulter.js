import fs from "fs"
import logger from "../config/logger.js"

export default function eliminarUploadsMulter(archivos) {
    try {
        if (Array.isArray(archivos)) {
            archivos.forEach(archivo => {
                fs.existsSync(archivo.path) 
                    ? fs.unlinkSync(archivo.path) 
                    : logger.debug(`El archivo ${archivo.filename} no existe`)
            })
        } else {
            fs.existsSync(archivos.path) 
                ? fs.unlinkSync(archivos.path)
                : logger.debug(`El archivo ${archivos.filename} no existe`)
        }
        logger.info("Archivos huerfanos eliminados")
    } catch (error) {
        logger.error(`Error al Eliminar Archivos Huerfanos: ${archivos.filename ?? `\n`}`, error)
    }
}