import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import "./App.css";
import Hero from "./Body/Hero";
import Category from "./Body/Category";
import Login from "./User/Login";
import Signup from "./User/Signup";
import Products from "./Product/Products";
import ProductDetails from "./Product/ProductDetails";
import Error from "./Error/Error";
import AuthProvider from "../store/AuthProvider";
import Logout from "./User/Logout";
import Cart from "./Cart/Cart";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateProduct from "../Components/Seller/CreateProduct";

function App(props) {
  // const userContext = useContext(UserContext);
  // const [user, setUser] = useState();

  return (
    <div className="app">
      <AuthProvider>
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
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route
            path="*"
            element={
              <>
                <Navbar /> <Error />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
