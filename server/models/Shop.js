const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  address: String,
  owner: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('managers', shopSchema);
