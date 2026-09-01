import { expect } from "chai"
import supertest from "supertest"
import app from "../../src/app.js"
import MockService from "../../src/mocks/services/mocks.service.js"
import { USER_ROLES } from "../../src/constants/index.js"

const request = supertest(app)

describe("GET /api/users", function() {

    it("Debería obtener todos los usuarios", async function() {
        const respuesta = await request.get("/api/users")
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
    })

    before(agregarMockData)

    it("Debería obtener el usuario", async function() {
        const respuesta = await request.get(`/api/users/${this.mockData._id}`)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.get(`/api/users/6a94c184b3bd3d8419a2ffff`)
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.get(`/api/users/claramenteNoUnObjectID`)
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("POST /api/users", function() {

    it("Debería crear un usuario usando JSON", async function() {
        const respuesta = await request.post("/api/users").send(MockService.generateMockUsers(1)[0])
        expect(respuesta.statusCode).to.be.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        this.email = respuesta.body.data.email
    })
 
    it("Debería crear un usuario usando multipart/form-data", async function() {
        const mockUser = MockService.generateMockUsers(1)[0]
        const respuesta = await request.post("/api/users")
            .field("first_name", mockUser.first_name)
            .field("last_name", mockUser.last_name)
            .field("email", mockUser.email)
            .field("password", mockUser.password)
            .field("role", mockUser.role)
            .attach("documents", /*"RUTA"*/)
        expect(respuesta.statusCode).to.be.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.have.property("documents")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.post("/api/users").send({})
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 409", async function() {
        const usuario = MockService.generateMockUsers(1)[0]
        usuario.email = this.email
        const respuesta = await request.post("/api/users").send(usuario)
        expect(respuesta.status).to.equal(409)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("PATCH /api/users/", function() {
    before(agregarMockData)

    it("Debería actualizar un usuario usando JSON", async function() {
        const respuesta = await request.patch(`/api/users/${this.mockData._id}`).send({
            documents: {
                fileName: "muy buen nombre",
                path: "url muy real",
                type: "evidencia-entrega"
            },
            role: "admin"
        })
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.have.property("role", "admin")
        expect(respuesta.body.data).to.have.property("documents")
        expect(respuesta.body.data.documents[0]).to.have.property("fileName", "muy buen nombre")
    })

    it("Debería actualizar un usuario usando multipart/form-data", async function() {
        const respuesta = await request.patch(`/api/users/${this.mockData._id}`)
            .field("role", USER_ROLES.ADMIN)
            .attach("documents", /*"RUTA"*/)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.have.property("role", "admin")
        expect(respuesta.body.data).to.have.property("documents")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.patch(`/api/users/6a94c184b3bd3d8419a2ffff`).send({
            role: "admin"
        })
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.patch(`/api/users/claramenteNoUnObjectID`).send({
            role: "admin"
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("DELETE /api/users/", function() {
    before(agregarMockData)

    it("Debería eliminar un usuario", async function() {
        const respuesta = await request.delete(`/api/users/${this.mockData._id}`)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("message")
        expect(respuesta.body.message).to.be.equal("Usuario Eliminado")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.delete(`/api/users/6a94c184b3bd3d8419a2ffff`)
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.delete(`/api/users/claramenteNoUnObjectID`)
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

async function agregarMockData() {
    const mockData = await MockService.generateMockData(1, "users")
    this.mockData = mockData[0]
}