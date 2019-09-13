const supertest = require("supertest");
const URL_TEST = process.env.APP_URL_TEST;
const server = supertest.agent(URL_TEST);

const test = () => {
    describe("Home", () => {
        it("GET /", async () => {
            let res = await server.get("/");
            expect(res.status).toEqual(200);
        });

        it("Check Database Connection", async () => {
            let res = await server.get("/");
            expect(res.status).toEqual(200);
            expect(res.body.database_status).toContain("connect");
        });
    });
};

module.exports = {
    test
};
