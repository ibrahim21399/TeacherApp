const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  _id:Number,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('admins', adminSchema);
