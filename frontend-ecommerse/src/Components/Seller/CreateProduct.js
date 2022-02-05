import react, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import "./Seller.css";
import Cookies from "js-cookie";

const CreateProduct = (props) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const [img, setImg] = useState("");
  const navigate = useNavigate();

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const productInfo = {
      name: titleRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
      image: img,
    };

    let formdata = new FormData();

    formdata.append("name", productInfo.name);
    formdata.append("description", productInfo.description);
    formdata.append("price", productInfo.price);
    formdata.append("category", productInfo.category);
    formdata.append("image", img);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/api/v1/product",
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("JWT")}`,
        },
      });
      console.log("success");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setImg(image);
  };

  return (
    <section className="section-createproduct">
      <div className="createproduct">
        <img className="logo" src={logo} />
        <p className="createproduct-text">Create your product here</p>

        <form onSubmit={handleCreateProduct}>
          <div className="createproduct-field">
            <label>Title</label>
            <input
              className="input"
              type="text"
              placeholder="title"
              ref={titleRef}
            />
          </div>
          <div className="createproduct-field">
            <label>Description</label>
            {/* <input className="input" type="textarea" placeholder="description" /> */}
            <textarea
              ref={descriptionRef}
              placeholder="Enter text here..."
            ></textarea>
          </div>
          <div className="price-category">
            <div className="createproduct-field">
              <label>Price</label>
              <input
                ref={priceRef}
                className="input"
                type="text"
                placeholder="price"
              />
            </div>
            <div className="createproduct-field">
              <label>Category</label>
              <input
                ref={categoryRef}
                className="input"
                type="text"
                placeholder="Category"
              />
            </div>
          </div>
          <div className="createproduct-field">
            <label>Photo</label>
            <input name="image" type="file" onChange={handleFileChange} />
          </div>

          <button className="btn btn-filled create-product-btn" type="submit">
            Create product
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;

// error creating product from the react.js
// working fine on postman
