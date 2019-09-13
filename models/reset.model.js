const mongoose = require("mongoose")
const Schema = mongoose.Schema

let resetSchema = new Schema ({
    email: String,
    token: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
})

let AktivToken = mongoose.model("AktivToken", resetSchema)

module.exports = AktivToken
