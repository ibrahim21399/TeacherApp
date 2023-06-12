const mongoose=require("mongoose");


const teacherSchema = new mongoose.Schema({
    
   email: { type: String,  unique: true },
    name: { type: String },
    password: { type: String},
    phone: { type: String},
    pricePerHour: { type: Number},
    experience: { type: Number },
    Latitude: { type: Number},
    Longitude: { type: Number},
    FieldId:{type:mongoose.Types.ObjectId,ref:"fields"},
    rating: { type: Number, default: 0 },
    registerationDate: { type: Date, default: Date.now },
    Active: { type: Boolean},
    AcceptanceDate: { type: Date },
    studentEnrolled : [{type:mongoose.Types.ObjectId, ref:"students"}],
    ratingArray : [{type:Number}],
  });
  
  module.exports = mongoose.model('teachers', teacherSchema);
  
