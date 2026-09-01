import logger from "../config/logger.js"
import UsersModel from "../models/userModel.js"

class UserRepository {
    static async getAll() {
        return await UsersModel.find().lean()
    }

    static async getById(id) {
        return await UsersModel.findById(id).lean()
    }

    static async create(usuario) {
        logger.info("Solicitud de Creación de Usuario")
        return (await UsersModel.create(usuario)).toObject()
    }

    static async createMany(usuarios) {
        logger.info("Solicitud de Creación de Multiples Usuarios")
        return await UsersModel.insertMany(usuarios, {lean: true})
    }

    static async updateById(id, data) {
        logger.info("Solicitud de Actualización de Usuario")
        return await UsersModel.findByIdAndUpdate(id, data, {returnDocument: "after", runValidators: true}).lean()
    }

    static async deleteById(id) {
        logger.info("Solicitud de Eliminación de Usuario")
        const eliminado = await UsersModel.findByIdAndDelete(id)
        return eliminado ? true : false
    }

    static async addDocument(id, document) {
        return await UsersModel.findByIdAndUpdate(id, {$push: {documents: document}}, 
            {returnDocument: "after", runValidators: true}
        )
    }
}

export default UserRepository