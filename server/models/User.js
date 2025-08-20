const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
