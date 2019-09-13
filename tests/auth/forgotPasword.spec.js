const supertest = require("supertest")
const URL_TEST = process.env.APP_URL_TEST
const server = supertest.agent(URL_TEST)

const test = () => {
    describe("Forgot Password Testing Section", () => {
        it("Positive Test", async () => {
            let data = {
                email: "admin@administrator.com",
            }

            let res = await server.post("/reset/lupas")
                .set("Content-Type", "application/json")
                .send(data)

            expect(res.status).toEqual(200)
            expect(res.body.status).toContain("success")
        })

        it("Negative Test", async () => {
            let data = {
                email: "wlwlwlwl@gmail.com",
            }
            let res = await server.post("/reset/lupas")
                .set("Content-Type", "application/json")
                .send(data)

            expect(res.status).toEqual(400)
        })
    })
}

module.exports = test
