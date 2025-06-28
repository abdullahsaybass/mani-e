// src/context/AppContext.js
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cart, setCart] = useState({ items: [] });

  // Load cart data
  const loadCart = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/cart`, {
        credentials: "include",
      });
      const json = await res.json();
      setCart(json);
    } catch (err) {
      console.error("Failed to load cart:", err.message);
    }
  };

  // Check auth on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${backendUrl}/api/auth/authenticated`, {
          credentials: "include",
        });
        const json = await res.json();
        if (json.success) {
          setIsLoggedIn(true);
          setUserData(json.user);
          await loadCart();
        }
      } catch (err) {
        console.error("Auth check failed:", err.message);
      }
    })();
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Login failed");
    setIsLoggedIn(true);
    setUserData(json.user);
    await loadCart();
  };

  // Logout
  const logout = async () => {
    await fetch(`${backendUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setUserData(null);
    setCart({ items: [] });
  };

  // Create product (Admin)
  const createProduct = async (productData) => {
    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", String(productData.price));
    formData.append("category", productData.category);
    formData.append("gender", productData.gender);

    if (productData.brand?.trim()) formData.append("brand", productData.brand);
    if (productData.subcategory?.trim()) formData.append("subcategory", productData.subcategory);

    formData.append("mainImage", productData.mainImage);
    productData.images.forEach((img) => formData.append("images", img));

    if (productData.variants?.length > 0) {
      formData.append("variants", JSON.stringify(productData.variants));
    } else {
      throw new Error("At least one variant is required");
    }

    const res = await fetch(`${backendUrl}/api/products`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const ct = res.headers.get("content-type") || "";
    if (!res.ok) {
      if (ct.includes("application/json")) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create product");
      } else {
        const errText = await res.text();
        throw new Error("Server returned an HTML error:\n" + errText);
      }
    }

    return res.json();
  };

  // Add to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn) throw new Error("Not authenticated. Please log in first.");
    const res = await fetch(`${backendUrl}/api/cart`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to add to cart");
    }
    const updatedCart = await res.json();
    setCart(updatedCart);
    return updatedCart;
  };

  // ✅ Place order with selected address
  const placeOrder = async (addressId) => {
    if (!isLoggedIn) throw new Error("Not authenticated");

    const res = await fetch(`${backendUrl}/api/orders`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Order failed");
    }

    const order = await res.json();
    setCart({ items: [] }); // Clear cart after order
    return order;
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        userData,
        setUserData,
        cart,
        createProduct,
        addToCart,
        placeOrder, // 👈 included here
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
