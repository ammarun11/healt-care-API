const express = require('express')
const router = express.Router()
const { check } = require("express-validator");
const CreatePatient = require("../actions/patients/createPatient.action")
const DetailPatient = require("../actions/patients/getdetailPatient.action")

router.post("/create",
    async (req, res, next) => {
        try {

            let data = await new CreatePatient(req).exec();

            return res.status(200).json({
                status: "success",
                data,
                message: "Create Patient data"
            })
        } catch (err) {
            return res.status(400).json({
                status: "error",
                message: err.message
            })
        }
    })

router.get("/:id", async (req, res, next) => {
    try {
        let {
            id
        } = req.params
        let data = await new DetailPatient(id).exec()

        return res.status(200).json({
            status: "success",
            data,
            message: "Get detail of Patient"
        })
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

module.exports = router
