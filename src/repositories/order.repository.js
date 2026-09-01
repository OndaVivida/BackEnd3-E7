import logger from "../config/logger.js"
import OrderModel from "../models/orderModel.js"

class OrderRepository {
    static async getAll() {
        return await OrderModel.find().populate("customer", "-password").lean()
    }

    static async getById(id) {
        return await OrderModel.findById(id).populate("customer", "-password").lean()
    }

    static async create(datosOrden) {
        logger.info("Solicitud de Creación de Orden")
        return (await OrderModel.create(datosOrden)).toObject()
    }

    static async createMany(ordenes) {
        logger.info("Solicitud de Creación de Múltiples Ordenes")
        return await OrderModel.insertMany(ordenes, {lean: true})
    }

    static async updateStatus(id, status) {
        logger.info("Solicitud de Actualización de Estado de Orden")
        return await OrderModel.findByIdAndUpdate(id, {status}, {returnDocument: "after", runValidators: true}).select("delivery_address total status priority").lean()
    }
}

export default OrderRepository