import ERROR_CODES from "../errors/codes.error.js"
import CustomError from "../errors/custom.error.js"
import UserService from "../services/user.service.js"

class UserController {
    static async getAll(req, res, next) {
        try {
            const usuarios = await UserService.getAll()
            res.status(200).json({data: usuarios})
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const usuario = await UserService.getById(req.params.id)
            res.status(200).json({data: usuario})
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            if (!req.body) throw new CustomError(ERROR_CODES.INVALID_INPUT, "Parametros faltantes")
            const {first_name, last_name, email, password, documents} = req.body
            if (!first_name || !last_name || !email || !password) {
                throw new CustomError(ERROR_CODES.INVALID_INPUT, "Parametros faltantes")
            }
            req.body.files = req.files
            const usuario = await UserService.create(req.body)
            res.status(201).json({message: "Usuario Creado", data: usuario})
        } catch (error) {
            next(error)
        }
    }

    static async updateById(req, res, next) {
        try {
            if (req.body) {
                req.body.files = req.files
                for (const propiedad in req.body) {
                    if (!req.body[propiedad]) {
                        delete req.body[propiedad]
                    }
                }
            } else {
                throw new CustomError(ERROR_CODES.INVALID_INPUT)
            }
            const usuario = await UserService.updateById(req.params.id, req.body)
            res.status(200).json({message: "Usuario Actualizado", data: usuario})
        } catch (error) {
            next(error)
        }
    }

    static async deleteById(req, res, next) {
        try {
            await UserService.deleteById(req.params.id)
            res.status(200).json({message: "Usuario Eliminado"})
        } catch (error) {
            next(error)
        }
    }
}

export default UserController