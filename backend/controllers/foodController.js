import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : "";

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image,
    });

    await food.save();
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add food" });
  }
};

// List food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to list food" });
  }
};

// Remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.warn("Image delete failed:", err);
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove food" });
  }
};

export { addFood, listFood, removeFood };
