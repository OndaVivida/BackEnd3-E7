import { expect } from "chai"
import supertest from "supertest"
import app from "../../src/app.js"
import MockService from "../../src/mocks/services/mocks.service.js"

const request = supertest(app)

describe("GET /api/orders", function() {

    it("Debería obtener todos los pedidos", async function() {
        const respuesta = await request.get("/api/orders")
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
    })

    before(agregarMockData)

    it("Debería obtener el pedido", async function() {
        const respuesta = await request.get(`/api/orders/${this.mockData._id}`)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.get(`/api/orders/6a94c184b3bd3d8419a2ffff`)
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.get(`/api/orders/claramenteNoUnObjectID`)
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("POST /api/orders", function() {

    it("Debería crear un pedido", async function() {
        const respuesta = await request.post("/api/orders").send(MockService.generateMockOrders(1)[0])
        expect(respuesta.statusCode).to.be.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.post("/api/orders").send({})
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("PATCH /api/orders/:id/status/", function() {
    before(agregarMockData)

    it("Debería actualizar un pedido", async function() {
        const respuesta = await request.patch(`/api/orders/${this.mockData._id}/status/picked_up`)
        expect(respuesta.statusCode).to.be.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.have.property("status", "picked_up")
    })

    it("Debería devolver un error 404", async function() {
        const respuesta = await request.patch(`/api/orders/6a94c184b3bd3d8419a2ffff/status/picked_up`)
        expect(respuesta.status).to.equal(404)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.patch(`/api/orders/claramenteNoUnObjectID/status/picked_up`)
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería devolver un error 400", async function() {
        const respuesta = await request.patch(`/api/orders/${this.mockData._id}/status/un_no_estado`)
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

async function agregarMockData() {
    const mockData = await MockService.generateMockData(1, "orders")
    this.mockData = mockData[0]
}