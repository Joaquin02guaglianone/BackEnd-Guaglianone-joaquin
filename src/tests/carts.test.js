import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Endpoint de pruebas de los carritos", () => {
  describe("Prueba de carritos", () => {

    it("get '/api/cart' devuelve todos los carritos", async () => {
        const response = await requester.get('/api/cart');

        expect(response.status).to.equal(200)
        expect(response.ok).to.equal(true)
        expect(response.body).to.be.an('array')

    })

    it("post '/api/cart' crea un carrito sin productos", async ()=> {

        const response = await requester.post('/api/cart')

        expect(response.status).to.equal(200)
        expect(response.ok).to.equal(true)
        expect(response.body).to.be.an('array')

    })

  it("el siguiente delete lo que hace es encontrar por id un carrito y vaciarlo, osea que lo deja existiendo pero sin productos adentro", async () => {
    
    const cartData = {
      products: [{ product: "productoId1", quantity: 2 }],
    };

    const { body } = await requester.post("/api/cart").send(cartData);
    const idDelete = body._id;
    const deleteCartResponse = await requester.delete(`/api/cart/${idDelete}`);

    expect(deleteCartResponse.statusCode).to.equal(200);
    expect(deleteCartResponse.ok).to.equal(true);
    expect(Array.isArray(deleteCartResponse.body.products)).to.be.true;
    expect(deleteCartResponse.body.products).to.be.empty;
  });
})

});