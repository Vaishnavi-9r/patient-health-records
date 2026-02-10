/**
 * authController.js
 * Handles authentication (login). Uses MongoDB User model.
 * Auto-creates user on first login for backward compatibility with existing frontend.
 */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");
const User = require("../models/User");

/**
 * POST /api/auth/login (and POST /login)
 * Validates credentials, issues JWT.
 * Expects: { email, password, role } (role: "patient" | "staff")
 * Returns: { success, message, token, user } or 401
 */
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required",
      });
    }

    const validRoles = ["patient", "staff"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'patient' or 'staff'",
      });
    }

    // Find existing user by email
    let user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (user) {
      // Verify password
      const valid = await user.comparePassword(password);
      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      // Ensure role matches
      if (user.role !== role) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials for this role",
        });
      }
    } else {
      // Auto-create user on first login (backward compatible with existing frontend)
      user = await User.create({
        email: email.toLowerCase(),
        password,
        role,
      });
    }

    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: { email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  login,
};
