const supertest = require("supertest")
const URL_TEST = process.env.APP_URL_TEST
const server = supertest.agent(URL_TEST)
const ResetPassword = require('../../models/reset-password.model')

const test = async () => {
    describe("Reset Password Testing Section", async () => {
        it("Positive Test", async () => {
            let query = await ResetPassword.findOne({
                email: "admin@administrator.com"
            })
            let data = {
                password: "11223344"
            }

            let res = await server.post(`/reset/${query.token}`)
                .set("Content-Type", "application/json")
                .send(data)

            expect(res.status).toEqual(200)
        })

        it("Negative Test", async () => {
            let data = {
                password: "0000000000"
            }
            let res = await server.post("/reset/:token")
                .set("Content-Type", "application/json")
                .send(data)

            expect(res.status).toEqual(400)
        })
    })
}

module.exports = test
