import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./CartPage.css";

const CartPage = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/cart");
      console.log("Cart data:", data);
      setCart(data);
    } catch (err) {
      setError("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, model, change) => {
    try {
      await axios.put(
        "/cart/update",
        { productId, model, change }
      );
      fetchCart();
    } catch (err) {
      alert("Failed to update cart");
    }
  };

  const removeItem = async (productId, model) => {
    try {
      await axios.delete("/cart/remove", {
        data: { productId, model },
      });
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  if (error) return <p>{error}</p>;
  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="item-info">
                <h4>{item.product.name}</h4>
                <p>Price: ₹{item.product.price}</p>
                <p>Model: {item.model}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => updateQuantity(item.product._id, item.model, 1)}>+</button>
                <button onClick={() => updateQuantity(item.product._id, item.model, -1)}>-</button>
                <button onClick={() => removeItem(item.product._id, item.model)}>Remove</button>
              </div>
            </div>
          ))}
          <p className="cart-total">
            Total: ₹
            {cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
};

export default CartPage;
