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
        if (data.files) {
            const documentos = (data.files).map(archivo => {
                return {
                    fileName: archivo.filename,
                    path: archivo.path,
                    type: DOCUMENT_TYPES.USER_DOCUMENT
                }
            })
            data.documents = documentos
            delete data.files
        }
        let { password } = data
        password = bcrypt.hashSync(password, 10)
        data.password = password
        const usuarioCreado = await UserRepository.create(data)
        delete usuarioCreado.password
        return usuarioCreado
    }

    static async updateById(id, data) {
        if (data.files) {
            const documentos = (data.files).map(archivo => {
                return {
                    fileName: archivo.filename,
                    path: archivo.path,
                    type: DOCUMENT_TYPES.USER_DOCUMENT
                }
            })
            const usuario = await UserRepository.addDocument(id, documentos)
            if (!usuario) {
                throw new CustomError(ERROR_CODES.USER_NOT_FOUND)
            }
            delete data.files
        }
        delete data.email
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