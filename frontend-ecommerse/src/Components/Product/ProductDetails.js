import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../store/auth-context";
import "./Products.css";
import axios from "axios";

const ProductDetails = (props) => {
  const params = useParams();
  const userContext = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  let userId;

  useEffect(() => {
    userId = userContext.user._id;

    async function fetchProduct() {
      const res = await axios.get(
        `http://localhost:8000/api/v1/product/one/${params.productId}`
      );

      const data = res.data.product;
      setProduct(data);
    }

    fetchProduct();
  }, []);

  // add to cart button action (this is working function)
  const addToCartHandler = async () => {
    try {
      console.log(userContext.isLoggedIn);
      if (userContext.isLoggedIn === true) {
        const response = await axios({
          method: "post",
          url: `http://localhost:8000/api/v1/product/one/${params.productId}/addtocart`,
          headers: {
            Authorization: `Bearer ${Cookies.get("JWT")}`,
          },
          data: {
            quantity,
          },
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const productImage = `http://localhost:8000/${product.image}`;

  return (
    <section className="section-product-details">
      <div className="product-details container">
        <img
          className="product-details-img"
          src={productImage}
          alt="product image"
        />

        <div className="product-details-right">
          <h3 className="turtary-heading">{product.name}</h3>
          <p className="product-details-right-description">
            {product.description}
          </p>

          <div className="price-quantity">
            <div>
              <p className="price-tag price">${product.price}</p>
              <p className="aditional">Free delivery and shipping</p>
            </div>
            <div>
              <input
                className="quantity-number"
                type="number"
                default="1"
                min="1"
                max="5"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label className="quantity-label">Quantity</label>
              {quantity > 5 || quantity < 0 ? " Please enter (0-5)" : ""}
            </div>
          </div>

          <button
            className="btn btn-filled add-to-cart"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
          {!userContext.isLoggedIn ? (
            <h2 className="turtary-heading">Please login in to add to cart</h2>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
