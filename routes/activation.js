const express = require('express')
const router = express.Router()

const Activation = require("../actions/login/activation.action")

router.get("/:token", async (req, res) => {
    try {
        let data = await new Activation(
            req.params.token
        ).exec()

        return res.send({
            status: 'success',
            message: 'Activation is done'
        })
    } catch(err) {
        return res.status(400).json({
            status: 'owalah error janc*k',
            message: err.message
        })
    }
})

module.exports = router
