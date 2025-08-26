const express = require('express');
const router = express.Router(); // Use Express Router, not the 'router' package
const Product = require('../models/Product');

// Mock authentication middleware (replace with your actual auth middleware)
const auth = (req, res, next) => {
  // For testing, we'll simulate a logged-in user
  req.user = { shopId: 'your-shop-id-here' }; // Replace with actual user data from JWT
  next();
};

// Get all products
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ shop: req.user.shopId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', auth, getProduct, (req, res) => {
  res.json(res.product);
});

// Create new product
router.post('/', auth, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    barcode: req.body.barcode,
    image: req.body.image,
    shop: req.user.shopId
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.patch('/:id', auth, getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.category != null) {
    res.product.category = req.body.category;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.stock != null) {
    res.product.stock = req.body.stock;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.barcode != null) {
    res.product.barcode = req.body.barcode;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', auth, getProduct, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findOne({ 
      _id: req.params.id, 
      shop: req.user.shopId 
    });
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

module.exports = router;