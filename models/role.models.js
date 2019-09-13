const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rolePaginate = require("mongoose-paginate");

let roleSchema = new Schema({
  name: String,
  permissions: {
    type: Array,
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
  delete_at: {
    type: Date,
    default: null
  }
});

roleSchema.plugin(rolePaginate);
let role = mongoose.model("Role", roleSchema);
module.exports = role;
