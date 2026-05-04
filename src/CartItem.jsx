import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const getTotalAmount = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  const handleQuantityChange = (name, quantity) => {
    if (quantity <= 0) {
      dispatch(removeItem(name));
    } else {
      dispatch(updateQuantity({ name, quantity: parseInt(quantity) }));
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", color: "#2e7d32", marginBottom: "20px" }}>
        🛒 Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ fontSize: "1.2rem", color: "#555" }}>Your cart is empty 🌱</p>
          <button
            onClick={onContinueShopping}
            style={{
              marginTop: "20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 30px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {cartItems.map((item) => (
            <div
              key={item.name}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "15px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
              />

              <div style={{ flex: 1 }}>
                <h4 style={{ color: "#1b5e20", margin: "0 0 5px" }}>{item.name}</h4>
                <p style={{ color: "#2e7d32", fontWeight: "bold", margin: "0 0 10px" }}>
                  {item.price}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => handleDecrement(item)}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    -
                  </button>

                  <span style={{ fontSize: "1rem", fontWeight: "bold" }}>{item.quantity}</span>

                  <button
                    onClick={() => handleIncrement(item)}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  >
                    +
                  </button>

                  <span style={{ marginLeft: "10px", color: "#555" }}>
                    Subtotal: ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.name)}
                style={{
                  backgroundColor: "#e53935",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "right",
            }}
          >
            <h3 style={{ color: "#1b5e20" }}>
              Total Amount: ${getTotalAmount()}
            </h3>

            <div style={{ marginTop: "15px", display: "flex", justifyContent: "flex-end", gap: "15px" }}>
              <button
                onClick={onContinueShopping}
                style={{
                  backgroundColor: "#fff",
                  color: "#4CAF50",
                  border: "2px solid #4CAF50",
                  padding: "10px 25px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Continue Shopping
              </button>

              <button
                onClick={() => alert("Coming Soon! 🌿")}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 25px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
