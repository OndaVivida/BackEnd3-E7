import logger from "../config/logger.js"
import { DOCUMENT_TYPES } from "../constants/index.js"
import ERROR_CODES from "../errors/codes.error.js"
import CustomError from "../errors/custom.error.js"
import UserRepository from "../repositories/user.repository.js"
import bcrypt from "bcrypt"

class UserService {
    static async getAll() {
        return await UserRepository.getAll()
    }

    static async getById(id) {
        const usuario = await UserRepository.getById(id)
        if (!usuario) {
            throw new CustomError(ERROR_CODES.USER_NOT_FOUND)
        }
        return usuario
    }

    static async create(data) {
        if (data.documents && typeof(data.documents) == "array") {
            const documentos = (data.documents).map(archivo => {
                let tipo
                if (archivo.fieldname === "documents") {
                    tipo = DOCUMENT_TYPES.USER_DOCUMENT
                } else {
                    tipo = undefined
                }
                return {
                    fileName: archivo.filename ?? archivo.fileName,
                    path: archivo.path,
                    type: tipo
                }
            })
            data.documents = documentos
        }
        let { password } = data
        password = bcrypt.hashSync(password, 10)
        data.password = password
        const usuarioCreado = await UserRepository.create(data)
        delete usuarioCreado.password
        return usuarioCreado
    }

    static async updateById(id, data) {

        if (data.files && typeof(data.files) == "array") {
            const documentos = (data.files).map(archivo => {
                let tipo
                if (archivo.fieldname === "documents") {
                    tipo = DOCUMENT_TYPES.USER_DOCUMENT
                } else {
                    tipo = undefined
                }
                return {
                    fileName: archivo.filename ?? archivo.fileName,
                    path: archivo.path,
                    type: tipo
                }
            })
            data.files = documentos
            await UserRepository.addDocument(id, data.files)
            delete data.files
        }
        const usuario = await UserRepository.updateById(id, data)
        if (!usuario) {
            throw new CustomError(ERROR_CODES.USER_NOT_FOUND)
        }
        return usuario
    }

    static async deleteById(id) {
        const usuario = await UserRepository.deleteById(id)
        if (!usuario) {
            throw new CustomError(ERROR_CODES.USER_NOT_FOUND)
        }
        logger.info("Usuario Eliminado")
        return
    }
}

export default UserService