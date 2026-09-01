import MockService from "../services/mocks.service.js"
import CustomError from "../../errors/custom.error.js"
import ERROR_CODES from "../../errors/codes.error.js"

class MockController {
    static mockingUsers(req, res, next) {
        try {
            const usuariosMock = MockService.generateMockUsers(req.query.qty)
            res.status(200).json({data: usuariosMock})
        } catch (error) {
            next(error)
        }
    }

    static mockingOrders(req, res, next) {
        try {
            const ordenesMock = MockService.generateMockOrders(req.query.qty)
            res.status(200).json({data: ordenesMock})
        } catch (error) {
            next(error)
        }
    }

    static mockingDeliveries(req, res, next) {
        try {
            const enviosMock = MockService.generateMockDeliveries(req.query.qty)
            res.status(200).json({data: enviosMock})
        } catch (error) {
            next(error)
        }
    }

    static async generateData(req, res, next) {
        try {
            const tipo = req.query.type
            if (!tipo) {
                throw new CustomError(ERROR_CODES.MOCK_INVALID_TYPE, "No se ingresó un tipo")
            }
            const dataGenerada = await MockService.generateMockData(req.query.qty, tipo)
            res.status(201).json({message: "Datos generados y guardados en db", data: dataGenerada})
        } catch (error) {
            next(error)
        }
    }
}

export default MockController