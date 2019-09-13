<<<<<<< HEAD
const supertest = require("supertest");
const URL_TEST = process.env.APP_URL_TEST;
const server = supertest.agent(URL_TEST);

const test = () => {
    describe("Login Testing Section", () => {
        it("Postitive Test", async () => {
            let data = {
                email: "admin@administrator.com",
                password: "11223344"
            };

            let res = await server
                .post("/login")
                .set("Content-Type", "application/json")
                .send(data);

            expect(res.status).toEqual(200);
        });

        it("Negative Test", async () => {
            let data = {
                email: "wlwlwlwl@gmail.com",
                password: "password"
            };
            let res = await server
                .post("/login")
                .set("Content-Type", "application/json")
                .send(data);

            expect(res.status).toEqual(400);
        });
    });
};

=======
const supertest = require("supertest");
const URL_TEST = process.env.APP_URL_TEST;
const server = supertest.agent(URL_TEST);

const test = () => {
    describe("Login Testing Section", () => {
        it("Postitive Test", async () => {
            let data = {
                email: "tahiraa@gmail.com",
                password: "bismillah99"
            }

            let res = await server
                .post("/login")
                .set("Content-Type", "application/json")
                .send(data);

            expect(res.status).toEqual(200);
        });

        it("Negative Test", async () => {
            let data = {
                email: "wlwlwlwl@gmail.com",
                password: "password"
            };
            let res = await server
                .post("/login")
                .set("Content-Type", "application/json")
                .send(data);

            expect(res.status).toEqual(400);
        });
    });
};

>>>>>>> 4c28b7c4678b58f8d9cdf9a28af92ed196803494
module.exports = test;