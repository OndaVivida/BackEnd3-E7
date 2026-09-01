import { expect } from "chai"
import request from "supertest"
import app from "../src/app.js"

describe("Routes que no son referidos a la lógica del negocio", () => {
    it("Debería ejecutar el endpoint de logger", async () => {
        const respuesta = await request(app).get("/logger-test")
        expect(respuesta.status).to.equal(200)
        expect(respuesta.body.message).to.equal("Fin prueba logger")
    })

    it("Debería mostrar la documentación", async () => {
        const respuesta = await request(app).get("/api/docs")
        expect(respuesta.status).to.be.oneOf([200, 301, 302])
    })

    it("Debería responder 404 para ruta inexistente", async () => {
        const respuesta = await request(app).get("/compumundoHiperMegaRed")
        expect(respuesta.status).to.equal(404)
        expect(respuesta.body).to.have.property("error")
    })
})