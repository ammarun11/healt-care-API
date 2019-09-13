const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let patientsSchema = new Schema({

    code: {
        type: String,
        required: true
    },
    id_number: {
        type: String,
        required: true
    },
    id_type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    age: Number,
    address: String,
    book_id: String,
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

let patients = mongoose.model("patients", patientsSchema);

module.exports = patients;