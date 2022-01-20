import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/images/hero.jpeg";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="hero container">
        <div className="hero-description">
          <h1 className="primary-heading">
            The best Ecommerce website in world
          </h1>
          <p className="hero-descrition-text">
            The most afforable and high quality products, delivered by world's
            top brand companies. Any kind of product's category can be found and
            in discounted prices.
          </p>

          <Link className="btn btn-filled" to="/signup">
            Get started
          </Link>
          <span className="btn explore">Explore more &#8595;</span>
        </div>
        <img
          className="hero-img"
          src={hero}
          alt="women carrying a shooping bag"
        />
      </div>
    </section>
  );
};

export default Hero;
