import logger from "../config/logger.js"
import ERROR_CODES from "../errors/codes.error.js"
import CustomError from "../errors/custom.error.js"
import DeliveryService from "../services/deliveries.service.js"

class DeliveryController {
    static async getAll(req, res, next) {
        try {
            const deliveries = await DeliveryService.getAll()
            res.status(200).json({data: deliveries})
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const delivery = await DeliveryService.getById(req.params.id)
            res.status(200).json({data: delivery})
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            if (!req.body) throw new CustomError(ERROR_CODES.INVALID_INPUT, "Parametros faltantes")
            const { order, driver } = req.body
            if (!order || !driver) {
                throw new CustomError(ERROR_CODES.INVALID_INPUT, "Parametros faltantes")
            }
            const deliveryEntrada = { order, driver }
            const delivery = await DeliveryService.create(deliveryEntrada)
            res.status(201).json({message: "Delivery Creado", data: delivery})
        } catch (error) {
            next(error)
        }
    }

    static async updateById(req, res, next) {
        try {
            const delivery = await DeliveryService.updateById(req.params.id, req.body)
            res.status(200).json({message: "Delivery Actualizado", data: delivery})
        } catch (error) {
            next(error)
        }
    }
}

export default DeliveryController