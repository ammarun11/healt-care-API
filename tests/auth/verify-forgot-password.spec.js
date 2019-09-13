const supertest = require("supertest")
const URL_TEST = process.env.APP_URL_TEST
const server = supertest.agent(URL_TEST)
const ResetPassword = require('../../models/reset-password.model')

const test = async () => {
    describe("Verify Forgot Password Token Testing Section", async() => {
        it("Positive Test", async () => {
            let query = await ResetPassword.findOne({
                email: "admin@administrator.com"
            })

            let res = await server.get(`/reset/${query.token}`)
                .set("Content.Type", "application/json")


                expect(res.status).toEqual(200)
        })

        it("Negative Test", async () => {

            let res = await server.get(`/reset/jabedabedooo`)
                .set("Content-Type", "application/json")

            
            expect(res.status).toEqual(400)
        })
    })
}

module.exports = test
