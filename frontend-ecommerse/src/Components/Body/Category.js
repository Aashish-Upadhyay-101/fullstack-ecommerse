import React from "react";
import { Link } from "react-router-dom";
import electronics from "../../assets/images/electronics.jpeg";
import babies from "../../assets/images/babies.jpeg";
import women from "../../assets/images/women.jpeg";
import "./Category.css";

const Category = () => {
  return (
    <section className="section-category">
      <div className="container">
        <h1 className="secondary-heading">Categories</h1>
        <div className="categories">
          <Link className="nav-link" to="/category/electronics">
            <figure className="category">
              <img
                className="category-img"
                src={electronics}
                alt="electronics gadget images"
              />
              <h3 className="turtary-heading category-heading">Electronics</h3>
            </figure>
          </Link>

          <Link className="nav-link" to="/category/babies">
            <figure className="category">
              <img
                className="category-img"
                src={babies}
                alt="electronics gadget images"
              />
              <h3 className="turtary-heading category-heading">Babies</h3>
            </figure>
          </Link>

          <Link className="nav-link" to="/category/women">
            <figure className="category">
              <img
                className="category-img"
                src={women}
                alt="electronics gadget images"
              />
              <h3 className="turtary-heading category-heading">Women</h3>
            </figure>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
