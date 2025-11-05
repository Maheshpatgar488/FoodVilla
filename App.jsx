
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

import ContactForm from "./contactform";
import About from "./About";
import NetworkStatus from "./NetworkStatus";
import LoginPage from "./LoginPage";
import Register from "./Register";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./cart"; // external cart.jsx
import OrderSuccess from "./OrderSuccess";


const HeaderComponent = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  // ✅ Ensure auth is never undefined
  if (!auth) {
    return (
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
    );
  }

  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to home
  };

  return (
    <header className="header">
      <img
        className="logo"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ugPmDWS53ADTJKE4fXIlAVP86MZohm8dyg&s"
        alt="Food Store Logo"
      />

      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>

          {!user && (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
            </>
          )}

          {user && (
            <>
              <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
              <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
              <li>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  🛒 Cart <span className="cart-count">({cartCount})</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};


/* ---------------------- Restaurant Card ---------------------- */
const RestaurantCard = ({ restaurant }) => (
  <Link to={`/restaurant/${restaurant.id}`} className="restraunt-card">
    <div style={{ position: "relative" }}>
      <img src={restaurant.image} alt={restaurant.name} />
      <span className="rating-badge">⭐ {restaurant.rating}</span>
    </div>
    <div className="card-content">
      <h2>{restaurant.name}</h2>
      <p>{restaurant.cuisine}</p>
      <div className="card-footer">
        <span className="difficulty-badge">{restaurant.difficulty}</span>
        <span className="time-badge">
          ⏱ {restaurant.prepTimeMinutes + restaurant.cookTimeMinutes} mins
        </span>
      </div>
    </div>
  </Link>
);

/* ---------------------- Body (Home Page) ---------------------- */
const Body = ({ restaurants }) => {
  const [searchTxt, setSearchTxt] = useState("");

  return (
    <div>
      <h1 className="page-title">
        🍴 Explore <span>Delicious Recipes</span>
      </h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchTxt}
          onChange={(e) => setSearchTxt(e.target.value)}
        />
      </div>
      <div className="restraunt-grid">
        {restaurants
          .filter((res) =>
            res.name.toLowerCase().includes(searchTxt.toLowerCase())
          )
          .map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
      </div>
    </div>
  );
};

/* ---------------------- Restaurant Details ---------------------- */
const RestaurantDetails = ({ restaurants, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find((res) => res.id === Number(id));

  if (!restaurant)
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Restaurant not found!
      </h2>
    );

  return (
    <div className="restaurant-details">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="details-image"
      />
      <h2>{restaurant.name}</h2>
      <p>
        <b>Cuisine:</b> {restaurant.cuisine}
      </p>
      <p>
        <b>Difficulty:</b> {restaurant.difficulty}
      </p>
      <p>
        <b>Time:</b> {restaurant.prepTimeMinutes + restaurant.cookTimeMinutes}{" "}
        mins
      </p>
      <button className="add-btn" onClick={() => addToCart(restaurant)}>
        🛒 Add to Cart
      </button>
      <button className="back-btn" onClick={() => navigate(-1)}>
        🔙 Back
      </button>
    </div>
  );
};

/* ---------------------- App ---------------------- */
const App = () => {
  // ✅ Persist cart in localStorage
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Fetch recipes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/recipes");
        const data = await res.json();
        const mapped = data.recipes.map((r) => ({
          id: r.id,
          name: r.name,
          cuisine: r.cuisine || r.mealType?.[0] || "International",
          difficulty: r.difficulty || "Medium",
          prepTimeMinutes: r.prepTimeMinutes || 15,
          cookTimeMinutes: r.cookTimeMinutes || 20,
          rating: r.rating || 4,
          image: r.image,
        }));
        setRestaurants(mapped);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increment = (id) =>
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );

  const decrement = (id) =>
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    );

  const removeItem = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="app-container">
      <NetworkStatus />
      <HeaderComponent cartCount={cart.length} />

      <div className="main-content">
        {loading ? (
          <h2 style={{ textAlign: "center", margin: "2rem" }}>
            Loading recipes...
          </h2>
        ) : (
          <Routes>
            <Route path="/" element={<Body restaurants={restaurants} />} />
            <Route
              path="/restaurant/:id"
              element={
                <ProtectedRoute>
                  <RestaurantDetails
                    restaurants={restaurants}
                    addToCart={addToCart}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cart}
                  increment={increment}
                  decrement={decrement}
                  removeItem={removeItem}
                  clearCart={() => setCart([])}
                />
              }
            />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
