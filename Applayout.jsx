import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import NetworkStatus from "./NetworkStatus";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import Register from "./Register";
import RestaurantDetails from "./RestaurantDetails";
import cart from "./cart";
import About from "./About";
import Contact from "./Contact";


// Dummy pages
const About = () => <h2>About Page</h2>;
const Contact = () => <h2>Contact Page</h2>;
const Body = ({ addToCart }) => (
  <h2 onClick={() => addToCart({ id: 1, name: "test", description: "test", image: "" })}>
    Body
  </h2>
);
const RestaurantDetails = ({ addToCart, restaurants }) => <h2>Restaurant Details</h2>;
const NotFound = () => <h2>Not Found</h2>;
const Footer = () => <h2>Footer</h2>;
const HeaderComponent = ({ cartCount }) => <h2>Header - Cart: {cartCount}</h2>;

// Cart Page
const Cart = ({ cartItems, increment, decrement, removeItem }) => (
  <div className="cart-container">
    <h1>Your Cart</h1>
    {cartItems.length === 0 ? (
      <p className="empty-cart">🛒 Your cart is empty</p>
    ) : (
      <ul className="cart-list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>qty: {item.qty}</p>
              <div className="cart-actions">
                <button onClick={() => increment(item.id)}>+</button>
                <button onClick={() => decrement(item.id)}>-</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const AppLayout = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cart, setCart] = useState([]);
  const restaurantList = [];

  // Add to cart
  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it.id === item.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 };
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increment = (id) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item))
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && (item.qty || 1) > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const cartCount = cart.reduce((sum, it) => sum + (it.qty || 1), 0);

  return (
    <AuthProvider>
      <NetworkStatus />
      <HeaderComponent cartCount={cartCount} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Body addToCart={addToCart} />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

        <Route path="/restaurant/:id"
          element={
            <ProtectedRoute>
              <RestaurantDetails 
               restaurants={restaurants} 
               addToCart={addToCart} 
               />
            </ProtectedRoute>
          }
        />


        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cartItems={cart}
                increment={increment}
                decrement={decrement}
                removeItem={removeItem}
              />
            </ProtectedRoute>
          }
        />



        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

    </AuthProvider>
  );
};

export default AppLayout;
