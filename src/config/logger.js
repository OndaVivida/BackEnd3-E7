import winston from "winston"
import WinstonRotateFile from "winston-daily-rotate-file"
import config from "./config.js"
import __dirname from "../utils/dirname.js"
import { join } from "path"

const level = config.NODE_ENV === "production" ? "info"
                : config.NODE_ENV === "test" ? "error" : "debug"

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red bold",
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        debug: "blue",
    },
}
const formatoConsola = winston.format.combine(
    winston.format.colorize({all: true}),
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.printf(({timestamp, level, message, ...metadatos}) => {
        const tieneMetadatos = Object.keys(metadatos).length > 0
        const metadatosSalida = tieneMetadatos ? ` ${JSON.stringify(metadatos)}` : ""
        return `${timestamp} [${level}]: ${message}${metadatosSalida}`
    }),
)
const formatoArchivo = winston.format.combine(
    winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.errors({stack: true}),
    winston.format.json()
)

winston.addColors(customLevels.colors)

const logger = winston.createLogger({
    level,
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({format: formatoConsola}),
        new WinstonRotateFile({
            dirname: join(__dirname, "../../logs"),
            filename: "error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            format: formatoArchivo,
            maxFiles: "14d",
        })
    ]
})

export default logger