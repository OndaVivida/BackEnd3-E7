import logger from "../config/logger.js"
import DeliveryModel from "../models/deliveryModel.js"

class DeliveryRepository {
    static async getAll() {
        return await DeliveryModel.find()
            .populate({path: "order", select: "-items", populate: {path: "customer", select: "first_name last_name"}})
            .populate({path: "driver", select: "-password"}).lean()
    }

    static async getById(id) {
        return await DeliveryModel.findById(id)
            .populate({path: "order", select: "-items", populate: {path: "customer", select: "first_name last_name"}})
            .populate({path: "driver", select: "-password"}).lean()
    }

    static async create(delivery) {
        logger.info("Solicitud de Creación de Delivery")
        return (await DeliveryModel.create(delivery)).toObject()
    }

    static async createMany(deliveries) {
        return await DeliveryModel.insertMany(deliveries, {lean: true})
    }

    static async updateById(id, data) {
        logger.info("Solicitud de Actualización de Delivery")
        return await DeliveryModel.findByIdAndUpdate(id, data, {returnDocument: "after", runValidators: true}).lean()
    }
}

export default DeliveryRepository