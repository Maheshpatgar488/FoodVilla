import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Ressevilla Food Store</h1>
      {user ? (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
