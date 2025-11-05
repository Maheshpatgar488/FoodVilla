// PlaceOrderButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrderButton = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Build order object
    const order = {
      id: Date.now(),
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + (item.price || 150) * (item.qty || 1),
        0
      ),
      date: new Date().toISOString(),
    };

    // Save order in localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    // Clear cart
    clearCart();

    // Show popup
    alert("✅ Order placed successfully!");

    // Redirect to success page
    navigate("/order-success");
  };

  return (
    <button onClick={handlePlaceOrder} className="place-order-btn">
      ✅ Place Order
    </button>
  );
};

export default PlaceOrderButton;
