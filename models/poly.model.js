const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate")

let polySchema = new Schema({
    code: { 
        type :String,
        required: true
    },
    name: { 
        type :String,
        required: true
    },
    diseases: {
        type: Array,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    hospital_id: { 
        type : String,
        required: false,
        ref: 'Hospitals'
    },
    price: Number,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    delete_at: {
        type: Date,
        default: null
    }
});

polySchema.plugin(mongoosePaginate);
    
let Poly = mongoose.model("Poly", polySchema);

module.exports = Poly;
