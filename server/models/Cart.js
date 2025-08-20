// // models/Cart.js
// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   cart_id: { type: String, required: true },
//   items: { type: Array, required: true },
//   revenue: { type: Number, required: true },
//   start_time: { type: Date, required: true },
//   status: { 
//     type: String, 
//     enum: ['Available', 'In Use', 'Maintenance'], 
//     required: true 
//   },
//   complaints: { type: Array, default: [] },
//   reviews: { type: Array, default: [] },
//   alerts: { type: Array, default: [] },
//   maintenance_history: { type: Array, default: [] }
// });

// module.exports = mongoose.model('Cart', cartSchema);



// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//   cart_id: { type: String, required: true, unique: true },
//   items: { type: Array, default: [] },
//   revenue: { type: Number, default: 0 },
//   start_time: { type: Date, default: Date.now },
//   status: { 
//     type: String, 
//     enum: ['Available', 'In Use', 'Maintenance'], 
//     default: 'Available'
//   },
//   location: { type: String, default: 'Store Entrance' },
//   complaints: { type: Array, default: [] },
//   reviews: { type: Array, default: [] },
//   alerts: { type: Array, default: [] },
//   maintenance_history: { type: Array, default: [] }
// });

// module.exports = mongoose.model('Cart', cartSchema);










const mongoose = require('mongoose');

// Sub-schemas for better validation
const complaintSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Wheel Issue', 'Scanner Fault', 'Battery Low', 'Other']
  },
  description: String,
  reported_by: {
    type: String,
    default: 'Anonymous'
  },
  date_reported: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    default: 'Pending'
  },
  date_resolved: Date
}, { _id: false });

const reviewSchema = new mongoose.Schema({
  customer_id: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved'],
    default: 'Active'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const maintenanceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: String,
  technician: String,
  date_performed: {
    type: Date,
    default: Date.now
  },
  duration_minutes: Number
}, { _id: false });

const itemSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  cart_id: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  items: [itemSchema],
  revenue: { 
    type: Number, 
    default: 0,
    min: 0
  },
  start_time: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['Available', 'In Use', 'Maintenance'], 
    default: 'Available'
  },
  location: { 
    type: String, 
    default: 'Store Entrance',
    trim: true
  },
  complaints: [complaintSchema],
  reviews: [reviewSchema],
  alerts: [alertSchema],
  maintenance_history: [maintenanceSchema],
  last_updated: {
    type: Date,
    default: Date.now
  }
});

// Update last_updated timestamp before saving
cartSchema.pre('save', function(next) {
  this.last_updated = Date.now();
  next();
});

// Update last_updated timestamp before updating
cartSchema.pre('findOneAndUpdate', function(next) {
  this.set({ last_updated: Date.now() });
  next();
});

module.exports = mongoose.model('Cart', cartSchema);