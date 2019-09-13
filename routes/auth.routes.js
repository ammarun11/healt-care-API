const express = require('express')
const router = express.Router()
const auth = require("../actions/login/auth.action")

router.post("/", async (req, res) => {
    try {
        let data = await new auth(req).exec()

        return res.status(200).json({
            status: "success",
            data,
            message: "Token verify successfully!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error coy",
            message: err.message
        })
    }
})

module.exports = router