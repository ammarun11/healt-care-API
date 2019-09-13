const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

/**
 * User Schema
 */

let userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String,
    username: {
        type: String,
        unique: true
    },
    gender: String,
    role_id: {
        type: Array,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    activated_at: {
        type: Date,
        default: null
    },
    activation_token: {
        type: String,
        default: null
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

userSchema.plugin(mongoosePaginate);

let User = mongoose.model("User", userSchema);

module.exports = User;
