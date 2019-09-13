const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')

let hospitalSchema = new Schema({

    
    name: String,
    address: String,
    phone: String,
    city_id: String,
    images_path: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

hospitalSchema.plugin(mongoosePaginate)

let Hospital = mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital
