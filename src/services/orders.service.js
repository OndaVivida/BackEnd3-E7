import ERROR_CODES from "../errors/codes.error.js"
import CustomError from "../errors/custom.error.js"
import OrderRepository from "../repositories/order.repository.js"

class OrderService {
    static async getAll() {
        return await OrderRepository.getAll()
    }

    static async getById(id) {
        const orden = await OrderRepository.getById(id)
        if (!orden) {
            throw new CustomError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return orden
    }

    static async create(data) {
        return await OrderRepository.create(data)
    }

    static async updateStatus(id, data) {
        const orden = await OrderRepository.updateStatus(id, data)
        if (!orden) {
            throw new CustomError(ERROR_CODES.ORDER_NOT_FOUND)
        }
        return orden
    }
}

export default OrderService