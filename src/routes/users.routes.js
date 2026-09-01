import { Router } from "express";
import UserController from "../controllers/user.controller.js"
import { uploader } from "../config/multer.js"

const router = Router()

router.get("/", UserController.getAll)

router.get("/:id", UserController.getById)

router.post("/", uploader.array("documents"), UserController.create)

router.patch("/:id", uploader.array("documents"), UserController.updateById)

router.delete("/:id", UserController.deleteById)

export default router