import { Router } from "express";
import DeliveryController from "../controllers/delivery.controller.js"
import { uploader } from "../config/multer.js";

const router = Router()

router.get("/", DeliveryController.getAll)

router.get("/:id", DeliveryController.getById)

router.post("/", DeliveryController.create)

router.patch("/:id", uploader.single("delivered"), DeliveryController.updateById)

export default router