import { Router } from "express";
import logger from "../config/logger.js"

const router = Router()

router.get("/logger-test", (req, res) => {
    logger.debug("Prueba de log debug")
    logger.http("Prueba de log http")
    logger.info("Prueba de log info")
    logger.warn("Prueba de log warn")
    logger.error("Prueba de log error")
    logger.fatal("Prueba de log fatal")

    res.status(200).json({message: "Fin prueba logger"})
})

export default router