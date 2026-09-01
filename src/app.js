import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerSpecs from "./config/swagger.js"
import config from "./config/config.js"
import logger from "./config/logger.js"

import usersRoutes from "./routes/users.routes.js"
import ordersRouter from "./routes/orders.routes.js"
import deliveriesRouter from "./routes/deliveries.routes.js"
import mocksRouter from "./mocks/routes/mocks.routes.js"
import loggerRouter from "./routes/loggerTest.routes.js"

import errorHandler from "./middlewares/errorHandler.middleware.js"
import notFoundHandler from "./middlewares/notFoundHandler.middleware.js"
import loggerHttp from "./middlewares/loggerHttp.middleware.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

if (config.NODE_ENV !== "production") {
    app.use(loggerHttp)
    app.use("/api/mocks", mocksRouter)
}
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use("/", loggerRouter)
app.use("/api/users", usersRoutes)
app.use("/api/orders", ordersRouter)
app.use("/api/deliveries", deliveriesRouter)

app.use(notFoundHandler)
app.use(errorHandler)

export default app