const express = require('express');
const router = express.Router(); // Add this line to create the router instance
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');

// Manager Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 1. Find manager by email
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { 
        id: manager._id,
        role: 'manager',
        shop: manager.shop 
      }, 
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // 4. Set cookie (optional) and return token
    res.cookie('managerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({ 
      token,
      manager: {
        id: manager._id,
        name: manager.managerName,
        email: manager.email,
        shop: manager.shop
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; // Export the router