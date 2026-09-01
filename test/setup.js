import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
dotenv.config({path: ".env.test", override: true})

if (process.env.NODE_ENV !== "test") {
    console.log(`\x1b[91m[AVISO]:\x1b[0m Se recomienda un .env.test con propiedad \x1b[34mMONGODB_URI\x1b[0m`)
    console.log("Proceso Detenido por Seguridad")
    process.exit(1)
}

before(async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log("Conectado a la Base de datos")
        } catch (error) {
            console.log("\x1b[91mError al conectar a la Base de Datos:\n\x1b[0m", error)
            process.exit(1)
        }
    }
})

after(async () => {
    const colecciones = mongoose.connection.collections
    for (const coleccion of Object.keys(colecciones)) {
        await colecciones[coleccion].deleteMany({})
    }
    await mongoose.connection.close()
})