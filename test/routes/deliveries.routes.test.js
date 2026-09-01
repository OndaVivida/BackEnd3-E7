import { expect } from "chai"
import supertest from "supertest"
import app from "../../src/app.js"
import MockService from "../../src/mocks/services/mocks.service.js"

const request = supertest(app)

describe("GET /api/deliveries", function() {

    it("Debería obtener todos los pedidos", async function() {
        const respuesta = await request.get("/api/deliveries")
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
    })

    before(agregarMockData)

    it("Debería obtener el pedido", async function() {
        const respuesta = await request.get(`/api/deliveries/${this.mockData._id}`)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.get(`/api/deliveries/6a94c184b3bd3d8419a2ffff`)
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.get(`/api/deliveries/claramenteNoUnObjectID`)
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("POST /api/deliveries", function() {

    it("Debería crear un pedido", async function() {
        const respuesta = await request.post("/api/deliveries").send(MockService.generateMockDeliveries(1)[0])
        expect(respuesta.statusCode).to.be.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.post("/api/deliveries").send({})
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("PATCH /api/deliveries", function() {
    before(agregarMockData)

    it("Debería actualizar un pedido usando JSON", async function() {
        const respuesta = await request.patch(`/api/deliveries/${this.mockData._id}`).send({
            picked_up_at: "2026-09-30T23:59:59.000Z"
        })
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.have.property("picked_up_at", "2026-09-30T23:59:59.000Z")
    })

    it("Debería actualizar un pedido usando multipart/form-data", async function() {
        const respuesta = await request.patch(`/api/deliveries/${this.mockData._id}`)
            .field("picked_up_at", "2026-09-30T23:59:59.000Z")
            .attach("delivered", /*"RUTA"*/)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.have.property("picked_up_at", "2026-09-30T23:59:59.000Z")
        expect(respuesta.body.data).to.have.property("delivered_proof")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.patch(`/api/deliveries/6a94c184b3bd3d8419a2ffff`).send({
            picked_up_at: "2026-09-30T23:59:59.000Z"
        })
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.patch(`/api/deliveries/claramenteNoUnObjectID`).send({
            picked_up_at: "2026-09-30T23:59:59.000Z"
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.patch(`/api/deliveries/claramenteNoUnObjectID`).send({
            picked_up_at: "pepe"
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

async function agregarMockData() {
    const mockData = await MockService.generateMockData(1, "deliveries")
    this.mockData = mockData[0]
}