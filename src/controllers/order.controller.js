import logger from "../config/logger.js"
import ERROR_CODES from "../errors/codes.error.js"
import CustomError from "../errors/custom.error.js"
import OrderService from "../services/orders.service.js"

class OrderController {
    static async getAll(req, res, next) {
        try {
            const ordenes = await OrderService.getAll()
            res.status(200).json({data: ordenes})
        } catch {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const orden = await OrderService.getById(req.params.id)
            res.status(200).json({data: orden})
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            if (!req.body) throw new CustomError(ERROR_CODES.INVALID_INPUT, "Parametros faltantes")
            const { customer, store_name, delivery_address, items, total, status, priority } = req.body
            if (!customer || !store_name || !delivery_address || !items, total === undefined) {
                throw new CustomError(ERROR_CODES.INVALID_INPUT, "Parametros faltantes")
            }
            const ordenEntrada = { customer, store_name, delivery_address, items, total, status, priority }
            const orden = await OrderService.create(ordenEntrada)
            res.status(201).json({message: "Orden Creada", data: orden})
        } catch (error) {
            next(error)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const orden = await OrderService.updateStatus(req.params.id, req.params.estado)
            res.status(200).json({message: "Orden Actualizada", data: orden})
        } catch (error) {
            next(error)
        }
    }
}

export default OrderController