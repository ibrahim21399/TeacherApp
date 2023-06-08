const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true  },
  registerationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('students', studentSchema);
