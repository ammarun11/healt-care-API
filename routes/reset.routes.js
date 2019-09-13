const express = require("express")
const router = express.Router()
const LupaPassword = require("../actions/reset/lupa-password.action")
const ShowPassword = require("../actions/reset/show-password.action")
const Reset = require("../actions/reset/ganti-password.action")

//Kirim email berisi token untuk ganti password
router.post("/", async (req, res) => {
    try {
        await new LupaPassword(req.body.email).exec()

        return res.send({
            code : 201,
            status: 'success',
            message: 'Reset password successfully check your email please~'
        })
    } catch (err) {
        return res.send({
            code : 400,
            status: "error",
            message: err.message
        })
    }
})

// Nampilih Data dari Token yang di dapat
router.get("/:token", async (req, res) => {
    try {
        let data = await new ShowPassword({
            token: req.params.token
        }).exec()

        return res.send({
            code: 200,
            status: 'success',
            data
        })
    } catch(err) {
        return res.send({
            code: 400,
            status: 'error',
            message: err.message
        })
    }
})

///Ganti Password
router.post("/:token", async(req, res) => {
    try {
        let data = await new Reset(req.body.password, req.params.token).exec()

        return res.send({
            code : 201,
            status: 'success',
            data
        })
    } catch(err) {
        return res.send({
            code : 400,
            status: 'error',
            message: err.message
        })
    }
    
})

module.exports = router