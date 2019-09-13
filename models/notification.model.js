const mongoose = require('mongoose')
const Schema = mongoose.Schema

let notificationSchema = new Schema ({
    title : {
        type: String,
    },
    message : String,
    is_read : {
        type: Boolean,
        default: false
    },
    user_id: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

let notification = mongoose.model("Notification", notificationSchema)

module.exports = notification