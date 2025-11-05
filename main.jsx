import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import App from "./App";

// Use HashRouter locally, BrowserRouter in production
const Router = import.meta.env.DEV ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
