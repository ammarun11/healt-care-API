const express = require('express')
const router = express.Router()
const login = require("../actions/login/login.action")

router.post("/", async (req, res) => {
    try {
        let data = await new login(req).exec()

        return res.status(200).json({
            status: "success",
            data,
            message: "login successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error coy",
            message: err.message
        })
    }
})

module.exports = router