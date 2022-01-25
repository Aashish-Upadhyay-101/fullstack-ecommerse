import React from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/images/hero.jpeg";

const ProductItem = ({ name, price, id }) => {
  const params = useParams();

  const link = `/category/${params.category}/${id}`;

  return (
    <Link className="nav-link" to={link}>
      <figure className="product-item">
        <img className="product-img" src={image} alt="product image" />{" "}
        {/* add image source later when source is available */}
        <div className="product-detail">
          <p className="product-title">{name}</p>
          <p className="price-tag">${price}</p>
          <p className="aditional">free shipping</p>
        </div>
      </figure>
    </Link>
  );
};

export default ProductItem;
