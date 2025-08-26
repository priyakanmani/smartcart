// // // const mongoose = require('mongoose');
// // // const bcrypt = require('bcryptjs');

// // // const managerSchema = new mongoose.Schema({
// // //   managerName: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   email: {
// // //     type: String,
// // //     required: true,
// // //     unique: true
// // //   },
// // //   password: {
// // //     type: String,
// // //     required: true
// // //   },
// // //   shop: {
// // //     name: {
// // //       type: String,
// // //       required: true
// // //     },
// // //     address: {
// // //       type: String,
// // //       required: true
// // //     },
// // //     phone: {
// // //       type: String,
// // //       required: true
// // //     }
// // //   },
// // //   assignedCarts: [{
// // //     type: String, // Store cart_id as string
// // //     ref: 'Cart',
// // //     // Explicitly tell Mongoose to reference by cart_id field
// // //     options: {
// // //       type: 'string',
// // //       path: 'cart_id'
// // //     }
// // //   }],
// // //   createdAt: {
// // //     type: Date,
// // //     default: Date.now
// // //   },
// // //   lastUpdated: {
// // //     type: Date,
// // //     default: Date.now
// // //   }
// // // });

// // // // Hash password before saving
// // // managerSchema.pre('save', async function(next) {
// // //   if (!this.isModified('password')) return next();
// // //   this.password = await bcrypt.hash(this.password, 10);
// // //   next();
// // // });

// // // // Update timestamps
// // // managerSchema.pre('save', function(next) {
// // //   this.lastUpdated = Date.now();
// // //   next();
// // // });

// // // managerSchema.pre('findOneAndUpdate', function(next) {
// // //   this.set({ lastUpdated: Date.now() });
// // //   next();
// // // });

// // // // Remove password from JSON output
// // // managerSchema.methods.toJSON = function() {
// // //   const obj = this.toObject();
// // //   delete obj.password;
// // //   return obj;
// // // };

// // // module.exports = mongoose.model('Manager', managerSchema);


// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const managerSchema = new mongoose.Schema({
// //   managerName: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true,
// //     trim: true
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //     minlength: 6
// //   },
// //   shop: {
// //     type: Object,
// //     default: {}
// //   },
// //   assignedCarts: {
// //     type: Array,
// //     default: []
// //   }
// // }, {
// //   timestamps: true
// // });

// // // Hash password before saving
// // managerSchema.pre('save', async function(next) {
// //   if (!this.isModified('password')) return next();
// //   this.password = await bcrypt.hash(this.password, 12);
// //   next();
// // });

// // // Compare password method
// // managerSchema.methods.comparePassword = async function(candidatePassword) {
// //   return await bcrypt.compare(candidatePassword, this.password);
// // };

// // module.exports = mongoose.model('Manager', managerSchema);



// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const managerSchema = new mongoose.Schema({
//   managerName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   shop: {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     id: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true
//     },
//     address: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     phone: {
//       type: String,
//       required: true,
//       trim: true
//     }
//   },
//   assignedCarts: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Cart'
//   }]
// }, {
//   timestamps: true
// });

// // Hash password before saving
// managerSchema.pre('save', async function(next) {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified('password')) return next();
  
//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password method
// managerSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('Manager', managerSchema);




const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const managerSchema = new mongoose.Schema({
  managerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  shop: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    }
  },
  assignedCarts: [{
    type: String // Changed from ObjectId to String to match frontend
  }]
}, {
  timestamps: true
});

// Hash password before saving
managerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
managerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Manager', managerSchema);