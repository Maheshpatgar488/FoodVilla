// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"; // ✅ shared styles

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // const userExists = storedUsers.find((user) => user.email === email);
     if (storedUsers.find(u => u.email === email)) {
      setError("User already exists!");
      return;
    }

    const newUser = { name, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          class="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          class="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          class="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          class="conf-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login" className="register-btn">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
