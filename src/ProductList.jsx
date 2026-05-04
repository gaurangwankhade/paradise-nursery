import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const products = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", price: "$15.00", description: "Easy to care for, great air purifier", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_plant_Sansevieria_trifasciata.jpg/800px-Snake_plant_Sansevieria_trifasciata.jpg" },
      { name: "Peace Lily", price: "$18.00", description: "Elegant white flowers, purifies air", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/800px-Spathiphyllum_cochlearispathum_RTBG.jpg" },
      { name: "Spider Plant", price: "$12.00", description: "Fast growing, removes toxins", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Chlorophytum_comosum_-_Spider_Plant.jpg/800px-Chlorophytum_comosum_-_Spider_Plant.jpg" },
    ],
  },
  {
    category: "Succulents",
    plants: [
      { name: "Aloe Vera", price: "$10.00", description: "Medicinal plant, very low maintenance", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png" },
      { name: "Echeveria", price: "$8.00", description: "Beautiful rosette shape, drought tolerant", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Echeveria_colorata.jpg/800px-Echeveria_colorata.jpg" },
      { name: "Jade Plant", price: "$14.00", description: "Brings good luck, long living", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Crassula_ovata.jpg/800px-Crassula_ovata.jpg" },
    ],
  },
  {
    category: "Tropical Plants",
    plants: [
      { name: "Monstera", price: "$25.00", description: "Iconic split leaves, easy to grow", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Monstera_deliciosa2.jpg/800px-Monstera_deliciosa2.jpg" },
      { name: "Bird of Paradise", price: "$30.00", description: "Stunning tropical beauty", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Bird_of_Paradise_Flower.jpg/800px-Bird_of_Paradise_Flower.jpg" },
      { name: "Pothos", price: "$9.00", description: "Perfect for beginners, trailing vines", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Epipremnum_aureum_31082012.jpg/800px-Epipremnum_aureum_31082012.jpg" },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const isInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#2e7d32", marginBottom: "30px" }}>
        🌿 Our Plants
      </h2>

      {products.map((category) => (
        <div key={category.category} style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "#388e3c", borderBottom: "2px solid #4CAF50", paddingBottom: "8px" }}>
            {category.category}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "15px" }}>
            {category.plants.map((plant) => (
              <div
                key={plant.name}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "15px",
                  width: "220px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h4 style={{ margin: "10px 0 5px", color: "#1b5e20" }}>{plant.name}</h4>
                <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "8px" }}>
                  {plant.description}
                </p>
                <p style={{ fontWeight: "bold", color: "#2e7d32", marginBottom: "10px" }}>
                  {plant.price}
                </p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.name)}
                  style={{
                    backgroundColor: isInCart(plant.name) ? "#aaa" : "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "8px 20px",
                    borderRadius: "20px",
                    cursor: isInCart(plant.name) ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {isInCart(plant.name) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
