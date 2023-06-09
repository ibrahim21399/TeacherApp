const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  registerationDate: { type: Date, default: Date.now },
  Active: { type: Boolean},

});

module.exports = mongoose.model('students', studentSchema);
