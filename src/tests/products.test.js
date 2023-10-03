import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');


describe("Endpoint de prueba de Productos", () => {

    describe("Prueba de Productos", () => {

        it("get '/api/products' devuelve todos los productos", async () => {
            const response = await requester.get('/api/products');

            expect(response.status).to.equal(200)
            expect(response.ok).to.equal(true)
            expect(response.body).to.be('array')

        })

        it("post '/api/products' crea un producto en base al body", async () => {

            const newProduct = {
                title: "nier automata",
                description: "juego fisico del juego",
                price: 30000,
                thumbnails: ["imagen del nier automata"],
                code: "114",
                stock: 4380,
                category: "rpg",
                owner: "joaquin"
            }

            const response = await requester.post('api/products').send(newProduct)

            expect(response.status).to.equal(200)
            expect(response.ok).to.equal(true)
            expect(response.body.payload).to.equal(newProduct)

        })

        it("delete '/api/products/:pid' borra un producto utilizando por parametro el if de un producto", async () => {

            const pid = "649a25e21c1853ff41332ab0"
            const response = await requester.delete(`api/products/${pid}}`)

            expect(response.status).to.equal(200)
            expect(response.ok).to.equal(true)
            expect(response.body).to.be('array')

        })

    })
})