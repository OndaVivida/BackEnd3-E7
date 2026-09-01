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
        if (data.files) {
            let tipo
            if (archivo.fieldname === "delivered") {
                tipo = DOCUMENT_TYPES.DELIVERY_PROOF
            } else {
                tipo = undefined
            }
            const documentos = {
                fileName: archivo.filename ?? archivo.fileName,
                path: archivo.path,
                type: tipo
            }
            data.files = documentos
            await DeliveryRepository.addDocument(id, data.files)
            delete data.files
        }
        const delivery = await DeliveryRepository.updateById(id, data)
        if (!delivery) {
            throw new CustomError(ERROR_CODES.DELIVERY_NOT_FOUND)
        }
        return delivery
    }
}

export default DeliveryService