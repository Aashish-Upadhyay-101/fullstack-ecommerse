import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import ProductItem from "./ProductItem";

const Products = () => {
  const params = useParams();

  const categroyTitle =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/${params.category}`
      );

      const products = response.data.product;
      setProduct(products);
    }
    fetchProduct();
  }, [categroyTitle]);
  return (
    <section className="products">
      <div className="container">
        <h3 className="turtary-heading">{categroyTitle}</h3>
        <div className="product">
          {product.map((elem) => (
            <ProductItem
              key={elem._id}
              id={elem._id}
              name={
                elem.name.length > 70
                  ? elem.name.substring(0, 70) + "..."
                  : elem.name
              }
              price={elem.price}
              image={elem.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
