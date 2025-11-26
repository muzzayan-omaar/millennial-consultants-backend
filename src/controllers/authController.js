import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const user = await User.create({ name, email, password, role });

    return res.json({ message: "Admin created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.json({
      message: "Logged in",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
