require("dotenv").config()
require("../db")
const Role = require("../models/role.models")
const datas = [
    {
        name: 'Admin',
        permissions: ["root"]
    },
    {
        name: 'User',
        permissions: ["user"]
    }
]

const seed = async (datas) => {
    console.log("Seed running role")
    console.log('=====================')
    await Role.remove({}).exec()
    let roles = []

    datas.forEach(async (el) => {
        let insert = new Role(el)

        try {
            await insert.save()
            console.log(insert)
            roles.push(insert._id)
        } catch (err) {
            console.log('=====================')
            console.error(err.message)
            setTimeout(() => {
                process.exit(0)
            }, 1000)
        }
    })
}

module.exports = seed(datas)
