import React, { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./style.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();



  const { login } = auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      login(validUser);
      setError("");
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email" class="login-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password" class="pass-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="register-btn">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
