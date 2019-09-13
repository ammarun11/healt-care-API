const supertest = require("supertest")
const URL_TEST = process.env.APP_URL_TEST
const server = supertest.agent(URL_TEST)

const test = () => {
    describe("Register Testing Section", () => {
        it("Positive Test", async () => {
            let data = {
                name :"hasbiiww",
                email :"hasbiww@mail.com",
                phone :"08960101010",
                username :"hasbi00ww",
                password : "hasbi1234",
                password_confirmation : "hasbi1234",
                gender : "pria",
                role_id: ["5d6ddba8de995f23e3da020d"]
            };

            let res = await server 
                .post("/register")
                .set("Content-Type", "application/json")
                .send(data);

            expect(res.status).toEqual(201);
            });

        it("Negative Role_id Test", async () => {
            let data = {
                name: "adelia",
                email: "adelia@gmail.com",
                phone: "0896016060706",
                username: "adelia",
                password: "12341234",
                password_confirmation: "12341234",
                role_id: "5d6dwewe",
                gender:"boy"
            };

            let res = await server.post("/register")
                .set("Content-Type", "application/json")
                .send(data);
            
                expect(res.status).toEqual(400);
        })

        it("Negative Test", async () => {
            let data = {
                name: "wlwlwlwl@gmail.com",
                email: "password",
                phone: "909",
                username: "polo",
                password_confirmation: "1236",
                gender: "lanang",
                roleee_id: ["5d6ddba8de995f23e3da2345"],
                gender:"boy"
            };
            let res = await server.post("/register")
                .set("Content-Type", "application/json")
                .send(data);
            expect(res.status).toEqual(422);
        })
    })
}

module.exports = test
