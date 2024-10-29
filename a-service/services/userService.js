const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helper/hashAuth");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const JWT_SECRET = "try123";
const validator = require("validator");

const registerUser = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;

    // Check for existing email
    const existEmail = await userRepository.findByEmail(email);
    if (existEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Validate input fields
    if (!username || !firstname || !lastname || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: { username, firstname, lastname, email },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({
      message: "Login successfully",
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, username } = req.body;
    const updates = { firstname, lastname, username };

    if (email) {
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
      }
      updates.email = email;
    }

    // Hash password
    if (password) {
      updates.password = await hashPassword(password);
    }

    const updatedUser = await userRepository.updateUser(req.user._id, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res
      .status(500)
      .json({ message: "Update failed", error: error.message });
  }
};

const requireSignIn = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization); // Debugging line
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error verifying token:", err); // Debugging line
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = { registerUser, loginUser, updateUser, requireSignIn };
