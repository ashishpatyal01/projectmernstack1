import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "random#secret", { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    // if (exists) return res.json({ success: false, message: "User already exists" });

    // if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email" });
    // if (password.length < 8) return res.json({ success: false, message: "Weak password" });
    if (exists) return res.status(400).json({ success: false, message: "User already exists" });
    if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: "Invalid email" });
    if (password.length < 8) return res.status(400).json({ success: false, message: "Weak password" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel({ name, email, password: hashedPassword }).save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    // res.json({ success: false, message: "Registration failed" });
    res.status(500).json({ success: false, message: "Registration failed" });

  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User doesn't exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Login failed" });
  }
};

export { registerUser, loginUser };
