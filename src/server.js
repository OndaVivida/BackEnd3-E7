import app from "./app.js"
import config from "./config/config.js"
import connectDB from "./config/db.js"
import logger from "./config/logger.js"

app.listen(config.PORT, (error) => {
    if (error) {
        logger.fatal("ERROR al iniciar el servidor.\n", error)
        process.exit(1)
    }
    logger.info(`Servidor Funcionando en:\x1b[96m http://localhost:${config.PORT}\x1b[0m`)
    connectDB()
})