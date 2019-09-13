const User = require("../../models/user.model")
//const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

class auth {
    constructor(req) {
        this.token = req.body.token
        //this.password = req.body.password
    }

    async exec() {
        try {
           
            let token = jwt.verify(this.token, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            })

            if(token == null ){
                throw err
            }

            else {   
                return token
            }

            
        } catch(err) {
            throw err
        }
    }
}

module.exports = auth