// cart.jsx
import React, { useState } from "react";
import PlaceOrderButton from "./PlaceOrderButton";

const Cart = ({ cartItems, increment, decrement, removeItem, clearCart }) => {
  const [status, setStatus] = useState(null);

  // Total
  const total = cartItems.reduce(
    (acc, item) => acc + (item.price || 150) * (item.qty || 1),
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length === 0 && status !== "success" ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price || 150}</p>

                <div className="counter">
                  <button
                    onClick={() => decrement(item.id)}
                    disabled={(item.qty || 1) <= 1}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => increment(item.id)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                🗑️
              </button>
            </div>
          ))}

          {/* Payment Section */}
          <div className="payment-section">
            <h3>Select Payment Method</h3>
            <div className="payment-options">
              <label>
                <input type="radio" name="payment" value="cod" defaultChecked />
                <span>💵 Cash on Delivery</span>
              </label>
              <label>
                <input type="radio" name="payment" value="card" />
                <span>💳 Credit/Debit Card</span>
              </label>
              <label>
                <input type="radio" name="payment" value="upi" />
                <span>📱 UPI</span>
              </label>
            </div>
          </div>

          <h3 className="total">Total: ₹{total}</h3>

          {/* ✅ Place Order Button */}
          <PlaceOrderButton cartItems={cartItems} clearCart={clearCart} />
        </>
      )}
    </div>
  );
};

export default Cart;
