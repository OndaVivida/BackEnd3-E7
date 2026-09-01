import { expect } from "chai"
import supertest from "supertest"
import app from "../../src/app.js"

const request = supertest(app)

describe("GET /api/mocks/mocking-users", function() {

    it("Debería devolver 10 usuarios mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-users")
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("email")
        expect(respuesta.body.data.length).to.equal(10)
    })

    it("Debería devolver 5 usuarios mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-users").query({
            qty: 5
        })
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("email")
        expect(respuesta.body.data.length).to.equal(5)
    })

    it("Debería devolver 1 usuario mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-users").query({
            qty: 1
        })
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("email")
        expect(respuesta.body.data.length).to.equal(1)
    })

    it("Debería devolver un error 400", async () => {
        const respuesta = await request.get("/api/mocks/mocking-users").query({
            qty: 500
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("GET /api/mocks/mocking-orders", function() {

    it("Debería devolver 10 ordenes mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-orders")
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("store_name")
        expect(respuesta.body.data.length).to.equal(10)
    })

    it("Debería devolver 5 ordenes mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-orders").query({
            qty: 5
        })
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("store_name")
        expect(respuesta.body.data.length).to.equal(5)
    })

    it("Debería devolver 1 ordenes mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-orders").query({
            qty: 1
        })
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("store_name")
        expect(respuesta.body.data.length).to.equal(1)
    })

    it("Debería devolver un error 400", async () => {
        const respuesta = await request.get("/api/mocks/mocking-orders").query({
            qty: 500
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("GET /api/mocks/mocking-deliveries", function() {

    it("Debería devolver 10 pedidos mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-deliveries")
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("driver")
        expect(respuesta.body.data.length).to.equal(10)
    })

    it("Debería devolver 5 pedidos mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-deliveries").query({
            qty: 5
        })
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("driver")
        expect(respuesta.body.data.length).to.equal(5)
    })

    it("Debería devolver 1 pedidos mock", async () => {
        const respuesta = await request.get("/api/mocks/mocking-deliveries").query({
            qty: 1
        })
        expect(respuesta.status).to.equal(200)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("driver")
        expect(respuesta.body.data.length).to.equal(1)
    })

    it("Debería devolver un error 400", async () => {
        const respuesta = await request.get("/api/mocks/mocking-deliveries").query({
            qty: 500
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})

describe("POST /api/mocks/generateData", function() {

    it("Debería guardar 3 usuarios mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 3,
            type: "users"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("email")
        expect(respuesta.body.data.length).to.equal(3)
    })

    it("Debería guardar 4 usuarios mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 4,
            type: "users"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("email")
        expect(respuesta.body.data.length).to.equal(4)
    })

    it("Debería guardar 10 usuarios mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            type: "users"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("email")
        expect(respuesta.body.data.length).to.equal(10)
    })

    it("Debería guardar 2 ordenes mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 2,
            type: "orders"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("store_name")
        expect(respuesta.body.data.length).to.equal(2)
    })

    it("Debería guardar 3 ordenes mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 3,
            type: "orders"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("store_name")
        expect(respuesta.body.data.length).to.equal(3)
    })

    it("Debería guardar 10 ordenes mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            type: "orders"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("store_name")
        expect(respuesta.body.data.length).to.equal(10)
    })

    it("Debería guardar 8 pedidos mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 8,
            type: "deliveries"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("driver")
        expect(respuesta.body.data.length).to.equal(8)
    })

    it("Debería guardar 15 pedidos mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 15,
            type: "deliveries"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("driver")
        expect(respuesta.body.data.length).to.equal(15)
    })

    it("Debería guardar 10 pedidos mock", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            type: "deliveries"
        })
        expect(respuesta.status).to.equal(201)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("data")
        expect(respuesta.body.data).to.be.an("array")
        expect(respuesta.body.data[0]).to.have.property("driver")
        expect(respuesta.body.data.length).to.equal(10)
    })

    it("Debería guardar un error 400", async () => {
        const respuesta = await request.post("/api/mocks/generateData")
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería guardar un error 400", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 5
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })

    it("Debería guardar un error 400", async () => {
        const respuesta = await request.post("/api/mocks/generateData").query({
            qty: 1,
            type: "erroneo"
        })
        expect(respuesta.status).to.equal(400)
        expect(respuesta.type).to.equal("application/json")
        expect(respuesta.body).to.have.property("error")
        expect(respuesta.body).to.not.have.property("data")
    })
})