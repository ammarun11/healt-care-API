const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cityPaginate = require("mongoose-paginate");

let citySchema = new Schema({
  name: String, 
  description: {
    type: String,
    default: null
  },
  alias_name: {
    type: Array,
    default: null
  },
  parent: {
    type: String,
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

citySchema.plugin(cityPaginate);
let City = mongoose.model("City", citySchema);
module.exports = City;
