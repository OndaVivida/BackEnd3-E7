import dotenv from "dotenv"
dotenv.config({quiet: true/*, override: true*/})

const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
}

let malformacion = []
Object.entries(config).forEach((valor) => {
    if (valor[1] === "" || valor[1] === undefined) {
        malformacion.push(valor[0])
    }
})

if (malformacion.length) {
    malformacion = malformacion.join(", ")
    console.log(`\x1b[91m[FATAL ERROR]: .env MALFORMADO, \x1b[0mFalta/n la/s propiedad/es: \x1b[34m${malformacion}\x1b[0m`)
    process.exit(1)
}

export default Object.freeze(config)