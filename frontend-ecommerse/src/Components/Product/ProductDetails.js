import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import productImage from "../../assets/images/electronics.jpeg";
import axios from "axios";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProduct() {
      const res = await axios.get(
        `http://localhost:8000/api/v1/product/one/${params.productId}`
      );

      const data = res.data.product;
      setProduct(data);
    }

    fetchProduct();
  });

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

          <p className="price-tag price">${product.price}</p>
          <p className="aditional">Free delivery and shipping</p>

          <a className="btn btn-filled add-to-cart" href="#">
            Add to Cart
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
