import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import OrderSummary from "./components/OrderSummary";
import Login from "./components/Login";
import Header from "./components/Header";
import PaymentGateway from "./components/PaymentGateway";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage (if any)
    const savedUser = localStorage.getItem("username");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const addToCart = (product) => {
   
    // Proceed with adding the product to the cart if the user is logged in
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems(cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(cartItems
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + delta } : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Router>
      <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        user={user} />

      <Routes>
        <Route
          path="/"
          element={<ProductList addToCart={addToCart} cartItems={cartItems} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/order-summary"
          element={<OrderSummary cartItems={cartItems} />}
        />
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />
        <Route
          path="/payment"
          element={<PaymentGateway />}
        />
      </Routes>
    </Router>
  );
}

export default App;
