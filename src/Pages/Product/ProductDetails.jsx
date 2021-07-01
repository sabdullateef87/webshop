import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
// import { GlobalContext } from "../../context/Provider";
import { GlobalContext } from "../../GlobalContext";

import { useParams, Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductDetails() {
  const [products, setProducts] = useContext(GlobalContext).productAPI.products;

  const [selectedProduct, setSelectedProduct] = useState([]);
  const { id } = useParams();



  useEffect(() => {
    if (id) {
      products.forEach((product) => {
        if (product._id === id) setSelectedProduct([product]);
      });
    }
  }, [id, products]);

  if (selectedProduct.length === 0) return null;
  return (
    <div className={`product__details`}>
      {selectedProduct.map((item, index) => (
        <div className={`product__details-container`} key={item._id}>
          <img src={item.images.secure_url} alt="my image" />

          <div className={`details`}>
            <h1>{item.title}</h1>
            <h3>
              <span>$</span>
              {item.price}
            </h3>
            <p>{item.description}</p>
            <p>{item.content}</p>
            <p>
              <span>{item.sold}</span> items sold
            </p>
          </div>
        </div>
      ))}
      <Link to="/product"> Back to products page</Link>
      <div style={{ marginTop: "2em" }}>
        <h1>Similar Products</h1>
        <div className={`similar__products`}>
          {/* {products.map((item) => {
          return item.category === selectedProduct.category
            ? console.log(item)
            : console.log("none");
        })} */}

          {products
            .filter((item) => item.category === selectedProduct[0].category)
            .map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
