const express = require('express')
const router = express.Router()
const Register = require("../actions/login/register.action")
const { check, validationResult, body } = require("express-validator")


router.post("/", 
[
    check('name').not().isEmpty(),
    check('email').not().isEmpty(),
    check('phone').not().isEmpty(),
    check('username').not().isEmpty(),
    check('gender').not().isEmpty(),
    check('password').not().isEmpty().isLength({ min: 8 }),
    check('password_confirmation').not().isEmpty(),
    body('password_confirmation').custom((value, { req }) => {
        if(value != req.body.password) {
            throw new Error('Password confirmation does not match')
        } else {
            return true
        }
    })
], 
async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: "error",
            message: errors.array()
        })
    }

    try {
        let data = await new Register(req).exec()
        return res.status(201).json({
            status: "success",
            data,
            message: "Regiseter successfully leh muantep!"
        })
    } catch(err) {
        return res.status(400).json({
            status: "error ouy",
            message: err.message
        })
    }
})

// router.get("/:token", async (req, res) => {
//     try {
//         let data = await new ShowPassword({
//             token: req.params.token
//         }).exec()

//         return res.send({
//             status: 'success',
//             data
//         })
//     } catch(err) {
//         return res.status(400).json({
//             status: 'error',
//             message: err.message
//         })
//     }
// })



// router.post("/:token", async(req, res) => {
//     try {
//         let data = await new Reset(req.body.password, req.params.token).exec()

//         return res.send({
//             status: 'success',
//             data
//         })
//     } catch(err) {
//         return res.status(400).json({
//             status: 'error',
//             message: err.message
//         })
//     }
// })

module.exports = router