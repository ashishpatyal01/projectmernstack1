

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cart = { ...user.cartData };

    const itemId = req.body.itemId;
    cart[itemId] = (cart[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(req.userId, { cartData: cart });

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cart = { ...user.cartData };

    const itemId = req.body.itemId;
    if (cart[itemId]) {
      cart[itemId] = Math.max(0, cart[itemId] - 1);
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData: cart });

    res.json({ success: true, message: "Removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    res.json({ success: true, cartData: user.cartData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
