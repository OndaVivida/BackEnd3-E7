import { DOCUMENT_TYPES } from "../constants/index.js"
import ERROR_CODES from "../errors/codes.error.js"
import CustomError from "../errors/custom.error.js"
import DeliveryRepository from "../repositories/delivery.repository.js"

class DeliveryService {
    static async getAll() {
        return await DeliveryRepository.getAll()
    }

    static async getById(id) {
        const delivery = await DeliveryRepository.getById(id)
        if (!delivery) {
            throw new CustomError(ERROR_CODES.DELIVERY_NOT_FOUND)
        }
        return delivery
    }

    static async create(data) {
        return await DeliveryRepository.create(data)
    }

    static async updateById(id, data) {
        if (data.file) {
            const archivo = data.file
            const documento = {
                fileName: archivo.filename,
                path: archivo.path,
                type: DOCUMENT_TYPES.DELIVERY_PROOF
            }
            data.delivered_proof = documento
            delete data.file
        }
        const delivery = await DeliveryRepository.updateById(id, data)
        if (!delivery) {
            throw new CustomError(ERROR_CODES.DELIVERY_NOT_FOUND)
        }
        return delivery
    }
}

export default DeliveryService