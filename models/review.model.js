const mongoose = require("mongoose")
const Schema = mongoose.Schema

let reviewSchema = new Schema({
    hospital_id: String,
    rate: Number,
    comment: String,
    user_id: String,
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

let ReviewModel = mongoose.model("Review", reviewSchema)

module.exports = ReviewModel
