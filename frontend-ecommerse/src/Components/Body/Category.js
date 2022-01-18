import React from "react";
import "./Category.css";

const Category = () => {
  return (
    <section className="section-category">
      <div className="container">
        <h1 className="secondary-heading">Categories</h1>
        <div className="categories">
          <p>Electronics</p>
          <p>Babies</p>
          <p>Women</p>
        </div>
      </div>
    </section>
  );
};

export default Category;
