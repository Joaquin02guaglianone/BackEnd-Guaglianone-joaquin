import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");


describe("endpoint prueba de users", () => {

    describe.only("prueba de users", () => {
      it("un usuario se deberia poder registrar sin problemas", async () => {

        const newUser = {
          firstName: "Nathan",
          lastName: "Drake",
          email: "nateDrakeAdmin@gmail.com",
          age: 35,
          password: "SPM",
          cart: "cartId",
          userRole: "admin",
        };
  
        const response = await requester.post("/api/register").send(newUser);
  
        expect(response.statusCode).to.equal(200);
        expect(response.ok).to.equal(true);
        expect(response.body).to.be.ok;

      });
  
      it("al logearse un usuario valido se debe crear una cookie", async () => {

        let cookieName = "CoderKeyFeliz";
          const newUser = {
            firstName: "sam",
            lastName: "Drake",
            email: "samDrake@gmail.com",
            age: 46,
            password: "Libertalia",
            cart: "CartId",
            userRole: "user",
          };
    
          const registrationResponse = await requester
            .post("/api/register")
            .send(newUser);
    
          expect(registrationResponse.statusCode).to.equal(200);
          expect(registrationResponse.ok).to.equal(true);
    
          const loginResponse = await chai
            .request(requester)
            .post("/api/login")
            .send({
              email: newUser.email,
              password: newUser.password,
            });
    
          expect(loginResponse.statusCode).to.equal(200);
          expect(loginResponse.ok).to.equal(true);
    
          expect(loginResponse).to.have.cookie(cookieName);
        });
    });

    it("este test esta para comprobar que un usuario al registrarse solo pueda elegir entre 2 roles, ya que el rol de admin se habilitaria de otra manera", async () => {
        const Roles = [ "premium", "user"];
        
        const newUser = {
          firstName: "Elena",
          lastName: "Fisher",
          email: "FisherE@gmail.com",
          age: 33,
          password: "ElDorado",
          cart: "CartID",
          userRole: "premium",
        };
  
        const response = await requester.post("/api/register").send(newUser);
  
        expect(response.statusCode).to.equal(200);
        expect(response.ok).to.equal(true);
        expect(Roles.includes(response.body.userRole)).to.be.true;
      });
  });