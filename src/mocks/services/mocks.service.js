import { exponentialDistributor, faker } from "@faker-js/faker"
import bcrypt from "bcrypt"
import { USER_ROLES, ORDER_STATUS, DELIVERY_PRIORITY, DOCUMENT_TYPES } from "../../constants/index.js"
import UserRepository from "../../repositories/user.repository.js"
import OrderRepository from "../../repositories/order.repository.js"
import DeliveryRepository from "../../repositories/delivery.repository.js"
import CustomError from "../../errors/custom.error.js"
import ERROR_CODES from "../../errors/codes.error.js"
import logger from "../../config/logger.js"

class MockService {
    static generateMockUsers(cantidad = 10) {
        cantidad = parseInt(cantidad)
        if (!cantidad || cantidad < 0 || cantidad > 100) {
            throw new CustomError(ERROR_CODES.MOCK_INVALID_AMOUNT)
        }
        const roles = Object.values(USER_ROLES)
        const mockUsers = Array.from({length: cantidad}, () => {
            return {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync(faker.internet.password(), 1),
                documents: Array.from({length: faker.number.int({min: 1, max: 2})}, () => {
                    return {
                        fileName: faker.science.chemicalElement().toString(),
                        path: faker.system.filePath(),
                        type: faker.helpers.arrayElement([DOCUMENT_TYPES.USER_DOCUMENT, DOCUMENT_TYPES.DRIVER_LICENSE])
                    }
                }),
                role: faker.helpers.arrayElement(roles)
            }
        })
        logger.info(`Creación de ${cantidad} Usuarios Mock Realizada`)
        return mockUsers
    }

    static generateMockOrders(cantidad = 10) {
        cantidad = parseInt(cantidad)
        if (!cantidad || cantidad < 0 || cantidad > 100) {
            throw new CustomError(ERROR_CODES.MOCK_INVALID_AMOUNT)
        }
        const estadosOrden = Object.values(ORDER_STATUS)
        const mockOrders = Array.from({length: cantidad}, () => {
            return {
                customer: faker.database.mongodbObjectId(),
                store_name: faker.company.name(),
                delivery_address: faker.location.streetAddress(),
                items: Array.from({length: faker.number.int({min: 1, max: 8})}, () => { 
                    return {
                        name: faker.commerce.product(), 
                        quantity: faker.number.int({min: 1, max: 10, distributor: exponentialDistributor({base: 5})}),
                        price: faker.commerce.price({min: 0, max: 10, dec: 3}) * 1000,
                    }
                }),
                total: faker.commerce.price({min: 0, max: 100, dec: 3}) * 1000,
                status: faker.helpers.arrayElement(estadosOrden),
                priority: faker.helpers.weightedArrayElement([{weight: 7, value: DELIVERY_PRIORITY.NORMAL}, {weight: 2, value: DELIVERY_PRIORITY.HIGH}, {weight: 1, value: DELIVERY_PRIORITY.LOW}]),
            }
        })
        logger.info(`Creación de ${cantidad} Ordenes Mock Realizada`)
        return mockOrders
    }

    static generateMockDeliveries(cantidad = 10) {
        cantidad = parseInt(cantidad)
        if (!cantidad || cantidad < 0 || cantidad > 100) {
            throw new CustomError(ERROR_CODES.MOCK_INVALID_AMOUNT)
        }
        const mockDeliveries = Array.from({length: cantidad}, () => {
            return {
                order: faker.database.mongodbObjectId(),
                driver: faker.database.mongodbObjectId(),
            }
        })
        logger.info(`Creación de ${cantidad} Deliveries Mock Realizada`)
        return mockDeliveries
    }

    static async generateMockData(cantidad, type) {
        type = type.toLowerCase()
        if (type == "users") {
            const usuarios = this.generateMockUsers(cantidad)
            logger.info(`Realizando Solicitud de Guardar ${cantidad} Usuarios Mock en db`)
            return await UserRepository.createMany(usuarios)
        }
        if (type == "orders") {
            const ordenes = this.generateMockOrders(cantidad)
            logger.info(`Realizando Solicitud de Guardar ${cantidad} Ordenes Mock en db`)
            return await OrderRepository.createMany(ordenes)
        }
        if (type == "deliveries") {
            const envios = this.generateMockDeliveries(cantidad)
            logger.info(`Realizando Solicitud de Guardar ${cantidad} Envíos Mock en db`)
            return await DeliveryRepository.createMany(envios)
        }

        throw new CustomError(ERROR_CODES.MOCK_INVALID_TYPE)
    }
}

export default MockService