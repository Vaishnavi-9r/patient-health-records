const express = require("express");
const cors = require("cors");

const app = express();

//  Middleware
app.use(cors());              // allow frontend requests
app.use(express.json());      // parse JSON body

//  Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

//  Login API
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  console.log("LOGIN HIT:", req.body);

  // TEMP DUMMY LOGIN (no database yet)
  if (email && password && role === "patient") {
    return res.json({
      success: true,
      token: "dummy-token-123",
      
  message: "Login successful",
  user: {
    email,
    role
  }
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});


//  Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

