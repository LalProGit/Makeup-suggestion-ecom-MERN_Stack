import Order from "../models/order.mjs";
import Clothing from "../models/clothing.mjs";
import Makeup from "../models/makeup.mjs";
import Cart from "../models/cart.mjs";  

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Fetch prices
    let totalPrice = 0;
    const detailedItems = [];

    for (const item of cart.items) {
      const productModel = item.model === "Clothing" ? Clothing : Makeup;
      const product = await productModel.findById(item.product);

      if (!product) continue;

      totalPrice += product.price * item.quantity;

      detailedItems.push({
        product: product._id,
        model: item.model,
        quantity: item.quantity,
      });
    }

    const user = req.user;
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const newOrder = await Order.create({
      user: userId,
      items: detailedItems,
      shippingAddress: user.address,
      paymentMethod,
      totalPrice,
      isPaid: false,
      expiresAt
    });


    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyOrders = async (req, res) => {
  try {
    await Order.deleteMany({
      user: req.user._id,
      expiresAt: { $lt: new Date() },
      isPaid: false
    });

    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const payOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.expiresAt < new Date()) {
      return res.status(400).json({ message: "Order has expired" });
    }

    if (order.isPaid) {
      return res.status(400).json({ message: "Order is already paid" });
    }

    // Simulate payment result (can replace with Razorpay/Stripe later)
    const paymentResult = {
      id: `txn_${Date.now()}`,
      status: "COMPLETED",
      update_time: new Date().toISOString(),
      email_address: req.user.email,
    };

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = paymentResult;

    await order.save();

    res.status(200).json({
      message: "Payment successful",
      payment: paymentResult,
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};