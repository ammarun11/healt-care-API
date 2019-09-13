const jwt = require("jsonwebtoken");
const Role = require("../models/role.models");
const { check, header, validationResult } = require('express-validator');


module.exports = () => {
    return async (req, res, next) => {
        
        let token = req.header("Authorization")

        // if (token == undefined) {
        //     return res.status(401).json(unauthenticated)
        //     return next
        // }/// Belum bekerja jika Key di kosongkan 

        // console.log(typeof token , token)

        let unauthenticated = {
            status : "unauthenticated",
            message: "Invalid header Token"
        }

        let query =  jwt.verify(token, process.env.JWT_SECRET)
        let data = query.user_role_id[0]

        let newquery = await Role.findOne({
            name : "Admin" 
        }).exec()

        let data1 = newquery._id
        
        if(data == data1) {
            jwt.verify(token, process.env.JWT_SECRET, (err,data) => {
                if(err)  return res.status(401).json(unauthenticated)
                return next()
            })
        }
        else {
            return res.status(401).json(unauthenticated)
        } 
    }
}