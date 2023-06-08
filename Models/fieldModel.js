const mongoose=require("mongoose");


const fieldSchema = new mongoose.Schema({
    _id:{type:Number},
    name: { type: String },   
  });
  
  module.exports = mongoose.model('fields', fieldSchema);
  
