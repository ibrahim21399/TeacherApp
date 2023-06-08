const mongoose=require("mongoose");


const fieldSchema = new mongoose.Schema({
    name: { type: String },
  });
  
  module.exports = mongoose.model('fields', fieldSchema);
  
