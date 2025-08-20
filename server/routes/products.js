const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authenticate, isAdmin } = require("../middleware/auth");

// Get all products (accessible to all authenticated users)
router.get("/", authenticate, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a product (admin only)
router.post("/", authenticate, isAdmin, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({ name, price, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a product (admin only)
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a product (admin only)
router.delete("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
