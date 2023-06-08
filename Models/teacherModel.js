const mongoose=require("mongoose");


const teacherSchema = new mongoose.Schema({
    
   email: { type: String,  unique: true },
    name: { type: String },
    password: { type: String},
    pricePerHour: { type: Number},
    experience: { type: Number },
    Latitude: { type: Number},
    Longitude: { type: Number},
    Active: { type: Boolean},
    field: { type: String },
    rating: { type: Number, default: 0 },
    registerationDate: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('teachers', teacherSchema);
  
