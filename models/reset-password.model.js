const mongoose = require("mongoose")
const Schema = mongoose.Schema

let resetSchema = new Schema ({
    email: String,
    token: String,
    created_at: {
        type: Date,
        default: null
    }
})

let ResetPassword = mongoose.model("ResetPassword", resetSchema)

module.exports = ResetPassword

    
