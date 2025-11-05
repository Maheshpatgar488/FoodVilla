// OrderSuccess.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>✅ Order Placed Successfully!</h1>
      <p>Thank you for shopping with us 🎉</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          ⬅️ Back to Home
        </button>

        <button
          onClick={() => navigate("/cart")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#2196F3",
            color: "white",
            cursor: "pointer",
          }}
        >
          🛒 View Cart
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
