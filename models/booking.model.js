const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongoosePaginate = require('mongoose-paginate')

let bookingSchema = new Schema({

    code: String,
    // refrence Users
    user_id: {
        type: String,
        ref: 'Users',
        required: true
    },
    description: {
        type: String,
        default: null
      },
    // refrence Poly
    poly_id: {
        type: String,
        ref: "Poly",
        required: true
    }, 
    booked_at:{
        type: Date,
        required: true
    },
    paid_at: {
        type: Date,
        default: null
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

});

bookingSchema.plugin(mongoosePaginate)
let booking = mongoose.model("booking", bookingSchema);

module.exports = booking;