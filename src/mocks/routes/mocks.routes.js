import { Router } from "express";
import MockController from "../controller/mocks.controller.js"

const router = Router()

router.get("/mocking-users", MockController.mockingUsers)

router.get("/mocking-orders", MockController.mockingOrders)

router.get("/mocking-deliveries", MockController.mockingDeliveries)

router.post("/generateData", MockController.generateData)

export default router