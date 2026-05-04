import React, { useState } from "react";
import "./App.css";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  const renderPage = () => {
    if (currentPage === "products") return <ProductList />;
    if (currentPage === "cart") return <CartItem />;
    if (currentPage === "about") return <AboutUs />;

    return (
      <div className="landing-page">
        <nav className="navbar">
          <h2>🌿 Paradise Nursery</h2>
          <div>
            <button
              className="get-started-button"
              style={{ marginRight: "15px", padding: "8px 20px" }}
              onClick={() => setCurrentPage("about")}
            >
              About Us
            </button>
            <span
              className="cart-icon"
              onClick={() => setCurrentPage("cart")}
            >
              🛒
            </span>
          </div>
        </nav>

        <div>
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Every Plant Finds Its Home 🌱</p>
          <button
            className="get-started-button"
            onClick={() => setCurrentPage("products")}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  };

  return <div>{renderPage()}</div>;
}

export default App;
