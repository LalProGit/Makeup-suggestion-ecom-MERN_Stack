import Cart from "../models/cart.mjs";
import Makeup from "../models/makeup.mjs";
import Clothing from "../models/clothing.mjs";


export const addToCart = async (req, res) => {
    const { productId, model, quantity } = req.body;

    if(!['Makeup', 'Clothing'].includes(model)){
        return res.status(400).json({ message: "Invalid model type" });
    }

    try {
        let cart = await Cart.findOne({user: req.user._id});

        if(!cart) {
            cart = new Cart({user: req.user._id, items: []});
        }

        let existingItem = cart.items.find(
            (item) => item.product.toString() === productId && item.model === model
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({product: productId, model: model, quantity: quantity || 1});
        }

        await cart.save();
        res.status(201).json({message: 'Item added to cart', cart});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        // Manually populate each item
        const populatedItems = await Promise.all(
            cart.items.map(async (item) => {
                let productDoc = null;
                if (item.model === "Makeup") {
                    productDoc = await Makeup.findById(item.product);
                } else if (item.model === "Clothing") {
                    productDoc = await Clothing.findById(item.product);
                }
                return {
                    ...item.toObject(),
                    product: productDoc
                };
            })
        );

        const populatedCart = {
            ...cart.toObject(),
            items: populatedItems
        };

        res.status(200).json(populatedCart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const removeFromCart = async (req, res) => {
  const { productId, model } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.model === model)
    );

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  const { productId, model, change } = req.body; // change = +1 or -1

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.model === model
    );

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity += change;

    if (item.quantity < 1) {
      cart.items = cart.items.filter(
        (i) => !(i.product.toString() === productId && i.model === model)
      );
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

