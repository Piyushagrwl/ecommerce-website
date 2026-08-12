import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />

        {/* Single Product */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Shopping Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* My Orders */}
        <Route path="/orders" element={<Orders />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route
  path="/wishlist"
  element={<Wishlist />}
/>
      </Routes>
    </>
  );
}

export default App;
