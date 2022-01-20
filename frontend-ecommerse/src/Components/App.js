import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import "./App.css";
import Hero from "./Body/Hero";
import Category from "./Body/Category";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Products from "./Product/Products";
import ProductDetails from "./Product/ProductDetails";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Category />
            </>
          }
        />
        <Route
          path="/category/:category"
          element={
            <>
              <Navbar />
              <Products />
            </>
          }
        />

        <Route
          path="/category/:categroy/:productId"
          element={
            <>
              <Navbar />
              <ProductDetails />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
