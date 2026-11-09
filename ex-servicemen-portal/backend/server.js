
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// USER MODEL
// ===============================

const userSchema = new mongoose.Schema(
  {
    name: {
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
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["veteran", "employer"],
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "VeteranConnect Backend is working"
  });
});

// ===============================
// REGISTER API
// ===============================

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!["veteran", "employer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account role"
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit phone number"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      phone,
      role,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
});

// ===============================
// LOGIN API
// ===============================

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
});

// ===============================
// JWT AUTHENTICATION MIDDLEWARE
// ===============================

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Login required."
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

// ===============================
// ROLE AUTHORIZATION MIDDLEWARE
// ===============================

function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this resource"
      });
    }

    next();
  };
}

// ===============================
// PROTECTED PROFILE API
// ===============================

app.get(
  "/api/auth/me",
  authenticateToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        user
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch profile"
      });
    }
  }
);

// ===============================
// PROTECTED DASHBOARD API
// ===============================

app.get(
  "/api/dashboard",
  authenticateToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        message: "Dashboard access granted",
        dashboard: {
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Unable to load dashboard"
      });
    }
  }
);

// ===============================
// VETERAN ONLY API
// ===============================

app.get(
  "/api/veteran/dashboard",
  authenticateToken,
  authorizeRole("veteran"),
  (req, res) => {
    res.json({
      success: true,
      message: "Veteran dashboard access granted"
    });
  }
);

// ===============================
// EMPLOYER ONLY API
// ===============================

app.get(
  "/api/employer/dashboard",
  authenticateToken,
  authorizeRole("employer"),
  (req, res) => {
    res.json({
      success: true,
      message: "Employer dashboard access granted"
    });
  }
);

// ===============================
// SERVER & DATABASE
// ===============================

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing from .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  });
