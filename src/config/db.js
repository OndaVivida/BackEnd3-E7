import mongoose from "mongoose"
import config from "./config.js"
import logger from "./logger.js"

export default async function connectDB() {
    try {
        await mongoose.connect(config.MONGODB_URI)
        logger.info("Conectado a la Base de datos.")
    } catch (error) {
        logger.fatal("Error al conectar a la Base de Datos:\n", error)
        process.exit(1)
    }
}