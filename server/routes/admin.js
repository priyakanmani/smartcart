// // // routes/admin.js
// // const express = require('express');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const Admin = require('../models/Admin');
// // const Manager = require('../models/Manager');

// // // Optional domain models if you have them for real overview data:
// // const Shop = require('../models/Shop');
// // const Cart = require('../models/Cart');
// // const User = require('../models/User');
// // const Alert = require('../models/Alert');

// // const router = express.Router();

// // // --- Admin auth middleware ---
// // const verifyAdmin = (req, res, next) => {
// //   const token =
// //     req.cookies?.adminToken || (req.headers.authorization || '').split(' ')[1];
// //   if (!token) return res.status(401).json({ message: 'Admin unauthorized' });
// //   try {
// //     const payload = jwt.verify(token, process.env.JWT_SECRET);
// //     req.adminId = payload.id;
// //     next();
// //   } catch (e) {
// //     return res.status(401).json({ message: 'Invalid admin token' });
// //   }
// // };

// // // --- Admin login ---
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;
// //     if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

// //     const admin = await Admin.findOne({ email });
// //     if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

// //     const isMatch = await bcrypt.compare(password, admin.password);
// //     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

// //     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// //     res.cookie('adminToken', token, {
// //       httpOnly: true,
// //       sameSite: 'Lax',
// //       secure: process.env.NODE_ENV === 'production',
// //     });

// //     res.json({ message: 'Login successful', token });
// //   } catch (err) {
// //     console.error('Admin login error:', err);
// //     res.status(500).json({ message: 'Server error during login' });
// //   }
// // });

// // // --- Overview ---
// // router.get('/overview', verifyAdmin, async (req, res) => {
// //   try {
// //     // If you have real models, use them; otherwise return zeros/empty.
// //     let totalShops = 0;
// //     let totalCarts = 0;
// //     let totalRevenue = 0;
// //     let activeUsers = 0;
// //     let alerts = [];

// //     if (Shop && Cart && User && Alert) {
// //       totalShops = await Shop.countDocuments();
// //       totalCarts = await Cart.countDocuments();
// //       const revenueAgg = await Cart.aggregate([
// //         { $group: { _id: null, total: { $sum: '$revenue' } } }, // adjust if field differs
// //       ]);
// //       totalRevenue = revenueAgg[0]?.total || 0;
// //       activeUsers = await User.countDocuments({ isActive: true });
// //       alerts = await Alert.find().sort({ createdAt: -1 }).limit(5);
// //     }

// //     res.json({
// //       totalShops,
// //       totalCarts,
// //       totalRevenue,
// //       activeUsers,
// //       alerts,
// //     });
// //   } catch (err) {
// //     console.error('Overview error:', err);
// //     res.status(500).json({ message: 'Server error fetching overview' });
// //   }
// // });

// // // --- Add manager + shop ---
// // router.post('/add-manager', verifyAdmin, async (req, res) => {
// //   try {
// //     const { managerName, email, password, shop, assignedCarts } = req.body;
// //     if (!managerName || !email || !password || !shop) {
// //       return res.status(400).json({ message: 'Missing required fields' });
// //     }

// //     const existing = await Manager.findOne({ email });
// //     if (existing) {
// //       return res.status(409).json({ message: 'Manager with that email already exists' });
// //     }

// //     const manager = new Manager({
// //       managerName,
// //       email,
// //       password, // hashed by pre-save hook
// //       shop: {
// //         name: shop.name,
// //         address: shop.address,
// //         phone: shop.phone,
// //       },
// //       assignedCarts: assignedCarts || [],
// //     });

// //     await manager.save();

// //     // Update cart statuses for assigned carts
// //     if (manager.assignedCarts.length > 0) {
// //       await Cart.updateMany(
// //         { cart_id: { $in: manager.assignedCarts } },
// //         { $set: { status: 'In Use' } }
// //       );
// //     }

// //     const safe = manager.toObject();
// //     delete safe.password;

// //     res.status(201).json({ manager: safe });
// //   } catch (err) {
// //     console.error('Add manager error:', err);
// //     res.status(500).json({ message: 'Server error adding manager' });
// //   }
// // });

// // // --- Update manager ---
// // router.put('/manager/:id', verifyAdmin, async (req, res) => {
// //   try {
// //     const { managerName, email, password, shop, assignedCarts } = req.body;
// //     const updates = {};

// //     if (managerName) updates.managerName = managerName;
// //     if (email) updates.email = email;
// //     if (shop) {
// //       updates.shop = {
// //         ...(shop.name !== undefined && { name: shop.name }),
// //         ...(shop.address !== undefined && { address: shop.address }),
// //         ...(shop.phone !== undefined && { phone: shop.phone }),
// //       };
// //     }
// //     if (assignedCarts !== undefined) updates.assignedCarts = assignedCarts;

// //     if (password) {
// //       const hashed = await bcrypt.hash(password, 10);
// //       updates.password = hashed;
// //     }

// //     const manager = await Manager.findByIdAndUpdate(
// //       req.params.id,
// //       { $set: updates },
// //       { new: true, runValidators: true }
// //     ).select('-password');

// //     if (!manager) return res.status(404).json({ message: 'Manager not found' });

// //     // Update cart statuses for assigned carts
// //     if (assignedCarts !== undefined) {
// //       // First reset previously assigned carts to Available
// //       const previousManager = await Manager.findById(req.params.id);
// //       if (previousManager?.assignedCarts?.length > 0) {
// //         await Cart.updateMany(
// //           { cart_id: { $in: previousManager.assignedCarts } },
// //           { $set: { status: 'Available' } }
// //         );
// //       }
      
// //       // Then update new assigned carts to In Use
// //       if (manager.assignedCarts.length > 0) {
// //         await Cart.updateMany(
// //           { cart_id: { $in: manager.assignedCarts } },
// //           { $set: { status: 'In Use' } }
// //         );
// //       }
// //     }

// //     res.json({ manager });
// //   } catch (err) {
// //     console.error('Update manager error:', err);
// //     res.status(500).json({ message: 'Server error updating manager' });
// //   }
// // });

// // // --- Delete manager ---
// // router.delete('/manager/:id', verifyAdmin, async (req, res) => {
// //   try {
// //     const manager = await Manager.findById(req.params.id);
// //     if (!manager) return res.status(404).json({ message: 'Manager not found' });

// //     // Reset assigned carts to Available before deleting
// //     if (manager.assignedCarts?.length > 0) {
// //       await Cart.updateMany(
// //         { cart_id: { $in: manager.assignedCarts } },
// //         { $set: { status: 'Available' } }
// //       );
// //     }

// //     await Manager.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Manager deleted' });
// //   } catch (err) {
// //     console.error('Delete manager error:', err);
// //     res.status(500).json({ message: 'Server error deleting manager' });
// //   }
// // });

// // // --- List managers ---
// // router.get('/managers', verifyAdmin, async (req, res) => {
// //   try {
// //     const managers = await Manager.find()
// //       .sort({ createdAt: -1 })
// //       .select('-password')
// //       .populate({
// //         path: 'assignedCarts',
// //         select: 'cart_id status location', // Only include these fields
// //         options: { lean: true } // Return plain JS objects
// //       });
      
// //     res.json({ managers });
// //   } catch (err) {
// //     console.error('Fetch managers error:', err);
// //     res.status(500).json({ message: 'Server error fetching managers' });
// //   }
// // });
// // module.exports = router;














// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin');
// const Manager = require('../models/Manager');
// const Cart = require('../models/Cart');

// const router = express.Router();

// // --- Admin auth middleware ---
// const verifyAdmin = (req, res, next) => {
//   const token = req.cookies?.adminToken || (req.headers.authorization || '').split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Admin unauthorized' });
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.adminId = payload.id;
//     next();
//   } catch (e) {
//     return res.status(401).json({ message: 'Invalid admin token' });
//   }
// };

// // --- Add manager + shop ---
// router.post('/add-manager', verifyAdmin, async (req, res) => {
//   try {
//     const { managerName, email, password, shop, assignedCarts } = req.body;
    
//     // Validate required fields
//     if (!managerName || !email || !password || !shop) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Check for existing manager
//     const existing = await Manager.findOne({ email });
//     if (existing) {
//       return res.status(409).json({ message: 'Manager with that email already exists' });
//     }

//     // Validate carts exist and are available
//     if (assignedCarts && assignedCarts.length > 0) {
//       const availableCarts = await Cart.countDocuments({ 
//         cart_id: { $in: assignedCarts },
//         status: 'Available'
//       });
//       if (availableCarts !== assignedCarts.length) {
//         return res.status(400).json({ message: 'One or more carts are not available' });
//       }
//     }

//     // Create new manager
//     const manager = new Manager({
//       managerName,
//       email,
//       password,
//       shop: {
//         name: shop.name,
//         address: shop.address,
//         phone: shop.phone,
//       },
//       assignedCarts: assignedCarts || [],
//     });

//     await manager.save();

//     // Update cart statuses
//     if (manager.assignedCarts.length > 0) {
//       await Cart.updateMany(
//         { cart_id: { $in: manager.assignedCarts } },
//         { $set: { status: 'In Use' } }
//       );
//     }

//     // Return manager without password
//     const safeManager = manager.toObject();
//     delete safeManager.password;

//     res.status(201).json({ manager: safeManager });
//   } catch (err) {
//     console.error('Add manager error:', err);
//     res.status(500).json({ message: 'Server error adding manager' });
//   }
// });

// // --- Update manager ---
// router.put('/manager/:id', verifyAdmin, async (req, res) => {
//   try {
//     const { managerName, email, password, shop, assignedCarts } = req.body;
//     const updates = {};

//     // Build update object
//     if (managerName) updates.managerName = managerName;
//     if (email) updates.email = email;
//     if (shop) {
//       updates.shop = {
//         ...(shop.name !== undefined && { name: shop.name }),
//         ...(shop.address !== undefined && { address: shop.address }),
//         ...(shop.phone !== undefined && { phone: shop.phone }),
//       };
//     }
//     if (assignedCarts !== undefined) {
//       // Validate carts if being updated
//       if (assignedCarts.length > 0) {
//         const availableCarts = await Cart.countDocuments({ 
//           cart_id: { $in: assignedCarts },
//           status: 'Available'
//         });
//         if (availableCarts !== assignedCarts.length) {
//           // Check if carts are assigned to this manager
//           const managerCarts = await Manager.findOne({ 
//             _id: req.params.id,
//             assignedCarts: { $in: assignedCarts }
//           });
//           if (!managerCarts) {
//             return res.status(400).json({ message: 'One or more carts are not available' });
//           }
//         }
//       }
//       updates.assignedCarts = assignedCarts;
//     }

//     // Handle password update
//     if (password) {
//       updates.password = await bcrypt.hash(password, 10);
//     }

//     // Find and update manager
//     const manager = await Manager.findByIdAndUpdate(
//       req.params.id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!manager) return res.status(404).json({ message: 'Manager not found' });

//     // Handle cart status updates if assignedCarts was modified
//     if (assignedCarts !== undefined) {
//       const previousManager = await Manager.findById(req.params.id);
      
//       // Carts to release (no longer assigned)
//       const cartsToRelease = previousManager?.assignedCarts?.filter(
//         cartId => !manager.assignedCarts.includes(cartId)
//       );
      
//       if (cartsToRelease?.length > 0) {
//         await Cart.updateMany(
//           { cart_id: { $in: cartsToRelease } },
//           { $set: { status: 'Available' } }
//         );
//       }
      
//       // Carts to assign (newly assigned)
//       const cartsToAssign = manager.assignedCarts.filter(
//         cartId => !previousManager?.assignedCarts?.includes(cartId)
//       );
      
//       if (cartsToAssign.length > 0) {
//         await Cart.updateMany(
//           { cart_id: { $in: cartsToAssign } },
//           { $set: { status: 'In Use' } }
//         );
//       }
//     }

//     res.json({ manager });
//   } catch (err) {
//     console.error('Update manager error:', err);
//     res.status(500).json({ message: 'Server error updating manager' });
//   }
// });

// // --- Delete manager ---
// router.delete('/manager/:id', verifyAdmin, async (req, res) => {
//   try {
//     const manager = await Manager.findById(req.params.id);
//     if (!manager) return res.status(404).json({ message: 'Manager not found' });

//     // Release all assigned carts
//     if (manager.assignedCarts?.length > 0) {
//       await Cart.updateMany(
//         { cart_id: { $in: manager.assignedCarts } },
//         { $set: { status: 'Available' } }
//       );
//     }

//     await Manager.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Manager deleted successfully' });
//   } catch (err) {
//     console.error('Delete manager error:', err);
//     res.status(500).json({ message: 'Server error deleting manager' });
//   }
// });

// // --- List managers ---
// router.get('/managers', verifyAdmin, async (req, res) => {
//   try {
//     const managers = await Manager.find()
//       .sort({ createdAt: -1 })
//       .select('-password')
//       .lean(); // Convert to plain JS objects

//     // Manually populate assigned carts
//     const managersWithCarts = await Promise.all(
//       managers.map(async manager => {
//         const carts = await Cart.find({ 
//           cart_id: { $in: manager.assignedCarts || [] }
//         }).select('cart_id status location').lean();
        
//         return {
//           ...manager,
//           assignedCarts: carts
//         };
//       })
//     );

//     res.json({ managers: managersWithCarts });
//   } catch (err) {
//     console.error('Fetch managers error:', err);
//     res.status(500).json({ message: 'Server error fetching managers' });
//   }
// });

// module.exports = router;













// routes/admin.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Manager = require('../models/Manager');
const Cart = require('../models/Cart');
const Shop = require('../models/Shop');
const User = require('../models/User');
const Alert = require('../models/Alert');

const router = express.Router();

// --- Admin auth middleware ---
const verifyAdmin = (req, res, next) => {
  const token = req.cookies?.adminToken || (req.headers.authorization || '').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Admin unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = payload.id;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid admin token' });
  }
};

// --- Admin login ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('adminToken', token, {
      httpOnly: true,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// --- Overview ---
router.get('/overview', verifyAdmin, async (req, res) => {
  try {
    let totalShops = 0;
    let totalCarts = 0;
    let totalRevenue = 0;
    let activeUsers = 0;
    let alerts = [];

    if (Shop && Cart && User && Alert) {
      totalShops = await Shop.countDocuments();
      totalCarts = await Cart.countDocuments();
      const revenueAgg = await Cart.aggregate([
        { $group: { _id: null, total: { $sum: '$revenue' } } },
      ]);
      totalRevenue = revenueAgg[0]?.total || 0;
      activeUsers = await User.countDocuments({ isActive: true });
      alerts = await Alert.find().sort({ createdAt: -1 }).limit(5);
    }

    res.json({
      totalShops,
      totalCarts,
      totalRevenue,
      activeUsers,
      alerts,
    });
  } catch (err) {
    console.error('Overview error:', err);
    res.status(500).json({ message: 'Server error fetching overview' });
  }
});

// --- Add manager + shop ---
router.post('/add-manager', verifyAdmin, async (req, res) => {
  try {
    const { managerName, email, password, shop, assignedCarts } = req.body;

    if (!managerName || !email || !password || !shop) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await Manager.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Manager with that email already exists' });
    }

    // Validate carts exist and are available
    if (assignedCarts && assignedCarts.length > 0) {
      const availableCarts = await Cart.countDocuments({
        cart_id: { $in: assignedCarts },
        status: 'Available'
      });
      if (availableCarts !== assignedCarts.length) {
        return res.status(400).json({ message: 'One or more carts are not available' });
      }
    }

    const manager = new Manager({
      managerName,
      email,
      password, // pre-save hook should hash
      shop: {
        name: shop.name,
        address: shop.address,
        phone: shop.phone,
      },
      assignedCarts: assignedCarts || [],
    });

    await manager.save();

    if (manager.assignedCarts.length > 0) {
      await Cart.updateMany(
        { cart_id: { $in: manager.assignedCarts } },
        { $set: { status: 'In Use' } }
      );
    }

    const safeManager = manager.toObject();
    delete safeManager.password;

    res.status(201).json({ manager: safeManager });
  } catch (err) {
    console.error('Add manager error:', err);
    res.status(500).json({ message: 'Server error adding manager' });
  }
});

// --- Update manager ---
router.put('/manager/:id', verifyAdmin, async (req, res) => {
  try {
    const { managerName, email, password, shop, assignedCarts } = req.body;
    const updates = {};

    if (managerName) updates.managerName = managerName;
    if (email) updates.email = email;
    if (shop) {
      updates.shop = {
        ...(shop.name !== undefined && { name: shop.name }),
        ...(shop.address !== undefined && { address: shop.address }),
        ...(shop.phone !== undefined && { phone: shop.phone }),
      };
    }

    if (assignedCarts !== undefined) {
      // Validate carts if updating
      if (assignedCarts.length > 0) {
        const availableCarts = await Cart.countDocuments({
          cart_id: { $in: assignedCarts },
          status: 'Available'
        });
        if (availableCarts !== assignedCarts.length) {
          const managerCarts = await Manager.findOne({
            _id: req.params.id,
            assignedCarts: { $in: assignedCarts }
          });
          if (!managerCarts) {
            return res.status(400).json({ message: 'One or more carts are not available' });
          }
        }
      }
      updates.assignedCarts = assignedCarts;
    }

    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const previousManager = await Manager.findById(req.params.id);
    const manager = await Manager.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!manager) return res.status(404).json({ message: 'Manager not found' });

    // Update cart statuses
    if (assignedCarts !== undefined && previousManager) {
      const cartsToRelease = previousManager.assignedCarts.filter(
        cartId => !manager.assignedCarts.includes(cartId)
      );
      if (cartsToRelease.length > 0) {
        await Cart.updateMany(
          { cart_id: { $in: cartsToRelease } },
          { $set: { status: 'Available' } }
        );
      }

      const cartsToAssign = manager.assignedCarts.filter(
        cartId => !previousManager.assignedCarts.includes(cartId)
      );
      if (cartsToAssign.length > 0) {
        await Cart.updateMany(
          { cart_id: { $in: cartsToAssign } },
          { $set: { status: 'In Use' } }
        );
      }
    }

    res.json({ manager });
  } catch (err) {
    console.error('Update manager error:', err);
    res.status(500).json({ message: 'Server error updating manager' });
  }
});

// --- Delete manager ---
router.delete('/manager/:id', verifyAdmin, async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) return res.status(404).json({ message: 'Manager not found' });

    if (manager.assignedCarts?.length > 0) {
      await Cart.updateMany(
        { cart_id: { $in: manager.assignedCarts } },
        { $set: { status: 'Available' } }
      );
    }

    await Manager.findByIdAndDelete(req.params.id);
    res.json({ message: 'Manager deleted successfully' });
  } catch (err) {
    console.error('Delete manager error:', err);
    res.status(500).json({ message: 'Server error deleting manager' });
  }
});

// --- List managers ---
router.get('/managers', verifyAdmin, async (req, res) => {
  try {
    const managers = await Manager.find()
      .sort({ createdAt: -1 })
      .select('-password')
      .lean();

    const managersWithCarts = await Promise.all(
      managers.map(async manager => {
        const carts = await Cart.find({
          cart_id: { $in: manager.assignedCarts || [] }
        }).select('cart_id status location').lean();
        return { ...manager, assignedCarts: carts };
      })
    );

    res.json({ managers: managersWithCarts });
  } catch (err) {
    console.error('Fetch managers error:', err);
    res.status(500).json({ message: 'Server error fetching managers' });
  }
});

module.exports = router;
