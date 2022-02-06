import { Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";
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
import UserContext from "../store/auth-context";

function App(props) {
  const userContext = useContext(UserContext);
  const [search, isSearch] = useState(false);

  const isProductSearched = (searchedValue) => {
    if (searchedValue.length > 1) {
      isSearch(true);
    } else {
      isSearch(false);
    }
  };

  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar isSearched={isProductSearched} />
                {!search ? (
                  <>
                    <Hero />
                    <Category />
                  </>
                ) : (
                  <Products isSearching={search} />
                )}
              </>
            }
          />
          <Route
            path="/category/:category"
            element={
              <>
                <Navbar isSearched={isProductSearched} />
                <Products isSearching={search} />
              </>
            }
          />

          <Route
            path="/category/:categroy/:productId"
            element={
              <>
                <Navbar isSearched={isProductSearched} />
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
