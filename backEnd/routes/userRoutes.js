const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// User registration
router.post("/register", async (req, res) => {
  try {
    // Get user data from the request body
    const { name, email, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email } });

    // If the user already exists, return an error
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // If the user does not exist, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: newUser.id }, "your-secret-key", {
      expiresIn: "1h", // Set the token expiration time (e.g., 1 hour)
    });

    // Send a success response with the token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    // Handle registration errors
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    // Get user data from the request body
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ where: { email } });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h", // Set the token expiration time (e.g., 1 hour)
    });

    // Send a success response with the token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    // Handle login errors
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
