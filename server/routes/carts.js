// // const express = require('express');
// // const Cart = require('../models/Cart');
// // const { authenticate, isAdmin } = require('../middleware/auth');
// // const router = express.Router();


// // // Get all carts
// // router.get('/', authenticate, isAdmin, async (req, res) => {
// //   try {
// //     const carts = await Cart.find().sort({ start_time: -1 });
// //     res.json(carts);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Get single cart
// // router.get('/:id', authenticate, isAdmin, async (req, res) => {
// //   try {
// //     const cart = await Cart.findOne({ cart_id: req.params.id });
// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Update cart status
// // router.put('/:id/status', authenticate, isAdmin, async (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     if (!['Available', 'In Use', 'Maintenance'].includes(status)) {
// //       return res.status(400).json({ message: 'Invalid status' });
// //     }

// //     const cart = await Cart.findOneAndUpdate(
// //       { cart_id: req.params.id },
// //       { status },
// //       { new: true }
// //     );

// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Add complaint
// // router.post('/:id/complaints', authenticate, async (req, res) => {
// //   try {
// //     const { type, description, reported_by } = req.body;
// //     if (!type) return res.status(400).json({ message: 'Type is required' });

// //     const cart = await Cart.findOneAndUpdate(
// //       { cart_id: req.params.id },
// //       {
// //         $push: {
// //           complaints: {
// //             type,
// //             description,
// //             reported_by: reported_by || 'Anonymous',
// //             status: 'Pending'
// //           }
// //         }
// //       },
// //       { new: true }
// //     );

// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Resolve complaint
// // router.put('/:id/complaints/:index/resolve', authenticate, isAdmin, async (req, res) => {
// //   try {
// //     const cart = await Cart.findOne({ cart_id: req.params.id });
// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });

// //     const index = parseInt(req.params.index);
// //     if (isNaN(index)) return res.status(400).json({ message: 'Invalid index' });

// //     if (index < 0 || index >= cart.complaints.length) {
// //       return res.status(400).json({ message: 'Complaint index out of range' });
// //     }

// //     cart.complaints[index].status = 'Resolved';
// //     await cart.save();
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });


// // // Add review
// // router.post('/:id/reviews', authenticate, async (req, res) => {
// //   try {
// //     const { customer_id, rating, comment } = req.body;
// //     if (!customer_id || !rating) {
// //       return res.status(400).json({ message: 'Customer ID and rating are required' });
// //     }

// //     const cart = await Cart.findOneAndUpdate(
// //       { cart_id: req.params.id },
// //       {
// //         $push: {
// //           reviews: {
// //             customer_id,
// //             rating,
// //             comment
// //           }
// //         }
// //       },
// //       { new: true }
// //     );

// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Add maintenance record
// // router.post('/:id/maintenance', authenticate, isAdmin, async (req, res) => {
// //   try {
// //     const { work_done, technician } = req.body;
// //     if (!work_done || !technician) {
// //       return res.status(400).json({ message: 'Work done and technician are required' });
// //     }

// //     const cart = await Cart.findOneAndUpdate(
// //       { cart_id: req.params.id },
// //       {
// //         $push: {
// //           maintenance_history: {
// //             work_done,
// //             technician
// //           }
// //         }
// //       },
// //       { new: true }
// //     );

// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // Add alert
// // router.post('/:id/alerts', authenticate, isAdmin, async (req, res) => {
// //   try {
// //     const { alert_type, message } = req.body;
// //     if (!alert_type || !message) {
// //       return res.status(400).json({ message: 'Alert type and message are required' });
// //     }

// //     const cart = await Cart.findOneAndUpdate(
// //       { cart_id: req.params.id },
// //       {
// //         $push: {
// //           alerts: {
// //             alert_type,
// //             message
// //           }
// //         }
// //       },
// //       { new: true }
// //     );

// //     if (!cart) return res.status(404).json({ message: 'Cart not found' });
// //     res.json(cart);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;



















// // routes/carts.js
// const express = require("express");
// const Cart = require("../models/Cart");

// const router = express.Router();
// const cartRoutes = require("./routes/carts");
// app.use("/api/carts", cartRoutes);
// // Create a new cart
// router.post("/", async (req, res) => {
//   try {
//     const cart = new Cart(req.body);
//     await cart.save();
//     res.status(201).json(cart);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get all carts
// router.get("/", async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.json(carts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




// // routes/carts.js
// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/Cart');

// // GET all carts
// router.get('/', async (req, res) => {
//   try {
//     const carts = await Cart.find();
//     res.json(carts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST new cart
// router.post('/', async (req, res) => {
//   try {
//     const newCart = new Cart(req.body);
//     const savedCart = await newCart.save();
//     res.status(201).json(savedCart);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;












// routes/carts.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single cart
router.get('/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ cart_id: req.params.cartId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new cart (only requires cart_id, others are default)
router.post('/', async (req, res) => {
  try {
    const { cart_id } = req.body;
    
    if (!cart_id) {
      return res.status(400).json({ error: 'Cart ID is required' });
    }

    // Check if cart already exists
    const existingCart = await Cart.findOne({ cart_id });
    if (existingCart) {
      return res.status(400).json({ error: 'Cart with this ID already exists' });
    }

    const newCart = new Cart({ cart_id });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update cart status
router.put('/:cartId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Available', 'In Use', 'Maintenance'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { cart_id: req.params.cartId },
      { status },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update cart details
router.put('/:cartId', async (req, res) => {
  try {
    const { status, location } = req.body;
    const validStatuses = ['Available', 'In Use', 'Maintenance'];
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (location) updateData.location = location;

    const updatedCart = await Cart.findOneAndUpdate(
      { cart_id: req.params.cartId },
      updateData,
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE cart
router.delete('/:cartId', async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ cart_id: req.params.cartId });
    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST add complaint to cart
router.post('/:cartId/complaints', async (req, res) => {
  try {
    const { type, description, reported_by } = req.body;
    
    if (!type) {
      return res.status(400).json({ error: 'Complaint type is required' });
    }

    const complaint = {
      type,
      description: description || '',
      reported_by: reported_by || 'Anonymous',
      date_reported: new Date(),
      status: 'Pending'
    };

    const updatedCart = await Cart.findOneAndUpdate(
      { cart_id: req.params.cartId },
      { $push: { complaints: complaint } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT resolve complaint
router.put('/:cartId/complaints/:complaintIndex/resolve', async (req, res) => {
  try {
    const complaintIndex = parseInt(req.params.complaintIndex);
    if (isNaN(complaintIndex)) {
      return res.status(400).json({ error: 'Invalid complaint index' });
    }

    const cart = await Cart.findOne({ cart_id: req.params.cartId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    if (complaintIndex < 0 || complaintIndex >= cart.complaints.length) {
      return res.status(400).json({ error: 'Invalid complaint index' });
    }

    cart.complaints[complaintIndex].status = 'Resolved';
    cart.complaints[complaintIndex].date_resolved = new Date();
    
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST add review to cart
router.post('/:cartId/reviews', async (req, res) => {
  try {
    const { customer_id, rating, comment } = req.body;
    
    if (!customer_id || !rating) {
      return res.status(400).json({ error: 'Customer ID and rating are required' });
    }

    const numericRating = parseInt(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const review = {
      customer_id,
      rating: numericRating,
      comment: comment || '',
      date: new Date()
    };

    const updatedCart = await Cart.findOneAndUpdate(
      { cart_id: req.params.cartId },
      { $push: { reviews: review } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(updatedCart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;