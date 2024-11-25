"react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/Orders/OrdersPage.js";
import Products from "./pages/Products/Products.js";
import ProductDetails from "./pages/Products/ProductDetails.js";
import Login from "./pages/Login/login.js";
import React from "react";
import Signup from "./pages/Login/signup.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<LandingPage />} />
        <Route path="/Orders" element={<OrdersPage />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
