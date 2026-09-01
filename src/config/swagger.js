import swaggerJSDoc from "swagger-jsdoc"
import config from "./config.js"
import errorResponsesBuilder from "../docs/componets/errorResponsesBuilder.js"

const errorResponses = errorResponsesBuilder()

const swaggerSpecs = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ShipNow API E5",
            version: "1.4.0",
            description: "API para gestion de usuarios, pedidos y entregas"
        },
        servers: [{
            url: `http://localhost:${config.PORT}`,
            description: "Servidor de desarrollo"
        }],
        tags: [
            {name: "Users", description: "Endpoints relacionados a la Gestión de Usuarios"},
            {name: "Orders", description: "Endpoints relacionados a la Gestión de Pedidos"},
            {name: "Deliveries", description: "Endpoints relacionados a la Gestión de Envios"},
            {name: "Logger", description: "Endpoint de prueba del Logger SOLO Testing"},
            {name: "Mocks", description: "Endpoints relacionados a la Gestión de Mocks"},
        ],
        components: {
            errorResponses
        },
    },
    apis: ["./src/docs/**/*.yaml"]
})

export default swaggerSpecs