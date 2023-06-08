const mongoose=require("mongoose");


const teacherSchema = new mongoose.Schema({
    
   email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    field: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    registerationDate: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('teachers', teacherSchema);
  
